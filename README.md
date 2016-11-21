# Budget Shary

[CHANGELOG](/CHANGELOG.md)<br/>
**[LIVE DEMO](https://shary.wailorman.ru/)**<br/>
[BUILDS](https://dev.shary.wailorman.ru/builds/)

## What is this?
Goal of this application is to equalize _expenses_ of all persons.

For example, two guys (Mike and Jimmy) want to drink a beer at home. Mike
went to a shop and buy two bottles of beer and spent 60 dollars (it's very expensive beer).

The $60 price is High for Mike. He wants to split it with Jimmy to not be left without money.

#### How?

So.
Both guys have the same _shares_ in this _budget_ -- 50%.
Mike have $60 expenses. Jimmy -- $0 expenses.
That is, _monetary shares_ of each guy = $30 _(totalExpenses * share)_

We need to equalize own expenses and monetary shares for each person.

By this example, funds of
```
Mike = 30 - 60 = -30
Jimmy = 30 - 0 = +30
```

Funds calculated by this formula:
```
Funds = shareInMonetary - ownExpenses [ + incomeTransactionsTotal - outcomeTransactionsTotal ]
```

To make funds of each persons equals 0, we can follow two ways:
  1. Reduce monetary share of Jimmy to 0 and increase for Mike to 60.<br/>
     But this way Mike will become drunk.
  2. Reduce expenses of Mike to 30 and increase for Jimmy to 30.

I think, Jimmy will like second way. So how to change expenses?<br/>
Easy! Jimmy should give $30 to Mike. In other language, we
need to create a transaction from Jimmy to Mike with 30 dollars total.

After transaction has been proceeded, let's recalculate funds for beer-guys.
```
Mike = 30 - 60 + 30 - 0 = 0
Jimmy = 30 - 0 + 0 - 30 = 0
```

Funds are equalized and now guys are happy.


## How to run?

##### **`npm start`**
Developing mode. Starting webpack-dev-server and watch on changes in all files (including sources & tests)
* [unit-browser.build](http://localhost:8080/webpack-dev-server/unit-browser.build) 
-- Live-reloading unit tests in browser
* [integration-dev.build](http://localhost:8080/webpack-dev-server/integration-dev.build) 
-- Live-reloading integration tests in browser
* [index.html](http://localhost:8080/webpack-dev-server/dist/index.html) 
-- Live-reloading main app page

Keeps tests files prebuilded

##### **`npm test`**
Runs all tests

##### **`[NODE_ENV=production] npm run build`**
Runs webpack and compiles all assets (sources & tests)

##### **`npm test:unit`**
Run unit tests (prebuild required)

##### **`npm run test:integration`**
##### **`npm run test:integration:dev`**
Runs integration tests in Karma and PhantomJS. Use `:dev` suffix to run Karma in watch mode

##### **`npm run storybook`**
Runs [Storybook](https://github.com/kadirahq/react-storybook) on 9001 port