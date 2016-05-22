export const fakeState = {
    persons: [
        {id: '1', name: 'Mike', share: '40'},
        {id: '2', name: 'Jack', share: '60'}
    ],
    products: [
        {id: '1', name: 'Water', price: '40', ownerId: '1'},
        {id: '2', name: 'Milk', price: '60', ownerId: '2'}
    ],
    errors: {}
};

export const fakeStateCase1 = { // case1
    persons: [
        {id: '1', name: 'Jack', share: '30'},
        {id: '2', name: 'Alice', share: '60'},
        {id: '3', name: 'Mike', share: '10'}
    ],
    products: [
        {id: '1', name: '',     price: '45',    ownerId: '1'},
        {id: '2', name: '',     price: '234',   ownerId: '1'},
        {id: '3', name: '',     price: '12',    ownerId: '1'},
        {id: '4', name: '',     price: '89',    ownerId: '1'},
        {id: '5', name: '',     price: '65',    ownerId: '1'},
        {id: '6', name: '',     price: '234',   ownerId: '1'},

        {id: '7', name: '',     price:  '345',  ownerId: '2'},
        {id: '8', name: '',     price:  '234',  ownerId: '2'},
        {id: '9', name: '',     price:  '890',  ownerId: '2'},
        {id: '10', name: '',    price: '1234',  ownerId: '2'},
        {id: '11', name: '',    price: '671',   ownerId: '2'},
        {id: '12', name: '',    price: '55',    ownerId: '2'},
        {id: '13', name: '',    price: '176',   ownerId: '2'},
        {id: '14', name: '',    price: '1876',  ownerId: '2'},

        {id: '15', name: '',    price: '504',   ownerId: '3'},
        {id: '16', name: '',    price: '646',   ownerId: '3'},
        {id: '17', name: '',    price: '756',   ownerId: '3'},
        {id: '18', name: '',    price: '50',    ownerId: '3'}
    ]
};

export const fakeStateCase1WithTransactions = { // case1
    persons: [
        {id: '1', name: 'Jack', share: '30'},
        {id: '2', name: 'Alice', share: '60'},
        {id: '3', name: 'Mike', share: '10'}
    ],
    products: [
        {id: '1', name: '',     price: '45',    ownerId: '1'},
        {id: '2', name: '',     price: '234',   ownerId: '1'},
        {id: '3', name: '',     price: '12',    ownerId: '1'},
        {id: '4', name: '',     price: '89',    ownerId: '1'},
        {id: '5', name: '',     price: '65',    ownerId: '1'},
        {id: '6', name: '',     price: '234',   ownerId: '1'},

        {id: '7', name: '',     price:  '345',  ownerId: '2'},
        {id: '8', name: '',     price:  '234',  ownerId: '2'},
        {id: '9', name: '',     price:  '890',  ownerId: '2'},
        {id: '10', name: '',    price: '1234',  ownerId: '2'},
        {id: '11', name: '',    price: '671',   ownerId: '2'},
        {id: '12', name: '',    price: '55',    ownerId: '2'},
        {id: '13', name: '',    price: '176',   ownerId: '2'},
        {id: '14', name: '',    price: '1876',  ownerId: '2'},

        {id: '15', name: '',    price: '504',   ownerId: '3'},
        {id: '16', name: '',    price: '646',   ownerId: '3'},
        {id: '17', name: '',    price: '756',   ownerId: '3'},
        {id: '18', name: '',    price: '50',    ownerId: '3'}
    ],
    transactions: [
        {from: '1', to: '2', total: 611.4},
        {from: '1', to: '3', total: 1144.4}
    ]
};

export const fakeStateForValidation1 = {
    persons: [
        { id: '0',  name: 'Chris',  share: '25' },      // normal
        { id: 1,    name: 'Shary',  share: '25' },      // should accept number id
        {           name: 'Mike',   share: '25' },      // missing id
        { id: '3',  name: '',       share: '25' },      // empty name
        { id: '3',  name: '',       share: '25' },      // share can be 0
        { id: '4',  name: 'Mike',   share: '-10' },     // share can't be negative
        { id: '5',  name: 'Jack' }                      // share missing
    ],
    products: [
        { id: '0',  name: 'Potato',  price: '25' },     // normal
        { id: 1,    name: 'Chips',  price: '25' },      // should accept number id
        {           name: 'Juice',   price: '25' },     // missing id
        { id: '3',  name: '',       price: '25' },      // empty name
        { id: '4',  name: 'Cigar',   price: '-10' },    // price can't be negative
        { id: '5',  name: 'Milk' }                      // price missing
    ]
};

export default fakeState;