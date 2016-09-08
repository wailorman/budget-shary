# Budget Shary
* and so on
 readme
 
### Validation Errors format
```
{
    id: [
        'ID missing',
        'Another ID'
    ],
    name: [
        'Name is invalid',
        'Strange Name'
    ],
    share: [
        'Share should be between 0..100',
        'Share should contain only digits and dots'
    ]
}
```

# TODO
## Budget container
* Add version number to the interface
* Validate full state, not only actions in validation middleware