# Budget Shary
# Using
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

##### **`npm run build`**
Runs webpack and compiles all assets (sources & tests)

##### **`npm test:unit`**
Run unit tests (prebuild required)

##### **`npm run test:integration`**
##### **`npm run test:integration:dev`**
Runs integration tests in Karma and PhantomJS. Use `:dev` suffix to run Karma in watch mode

##### **`npm run storybook`**
Runs [Storybook](https://github.com/kadirahq/react-storybook) on 9001 port