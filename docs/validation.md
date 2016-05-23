# Validation errors object example

```
{
    persons: [
        undefined,
        undefined,
        {
            share: [ 'Share can't be blank' ]
        },
        {
            name: [ 'Name can't be blank' ],
            share: [ 'Share must satisfy expression 0 <= x <= 100' ]
        },
        undefined
    ],
    products: [
        undefined,
        {
            price: [ 'Price must be greater than or equal to 0' ]
        }
    ],
    common: {
        shareSum: [ 'Share sum should be equal to 100' ]
    }
}
```