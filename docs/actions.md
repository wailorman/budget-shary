# Events payload

## Budget
### update
```js
 {
    eventName: actionNames.budget.update,
    model: Budget,      // model instance which for this event addressed
    attributes: {}      // new attributes for model
 } 
```

## Person
### create
```js
{
    eventName: actionNames.person.create,
    collection: PersonsCollection       // collection instance which we want to add to
}
```

### update
```js
{
    eventName: actionNames.person.update,
    model: Person,
    attributes: {}
}
```

### delete
```js
{
    eventName: actionNames.person.delete,
    model: Person
}
```

## Product
###create
```js
{
    eventName: actionNames.product.create,
    collection: ProductsCollection       // collection instance which we want to add to
}
```

###update
```js
{
    eventName: actionNames.product.update,
    model: Product,
    attributes: {}
}
```

###delete
```js
{
    eventName: actionNames.product.delete,
    model: Product
}
```