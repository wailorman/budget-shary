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

export const fakeParticipatingState = {
    persons: {
        1: {id: '1', name: 'Jack', share: '30'},
        2: {id: '2', name: 'Alice', share: '60'},
        3: {id: '3', name: 'Mike', share: '10'}
    },
    products: {
        1: {id: '1', name: '', price: '45', ownerId: '1'},
        2: {id: '2', name: '', price: '234', ownerId: '1'},
        3: {id: '3', name: '', price: '12', ownerId: '1'},
        4: {id: '4', name: '', price: '89', ownerId: '1'},
        5: {id: '5', name: '', price: '65', ownerId: '1'},
        6: {id: '6', name: '', price: '234', ownerId: '1'},

        7: {id: '7', name: '', price: '345', ownerId: '2'},
        8: {id: '8', name: '', price: '234', ownerId: '2'},
        9: {id: '9', name: '', price: '890', ownerId: '2'},
        10: {id: '10', name: '', price: '1234', ownerId: '2'},
        11: {id: '11', name: '', price: '671', ownerId: '2'},
        12: {id: '12', name: '', price: '55', ownerId: '2'},
        13: {id: '13', name: '', price: '176', ownerId: '2'},
        14: {id: '14', name: '', price: '1876', ownerId: '2'},

        15: {id: '15', name: '', price: '504', ownerId: '3'},
        16: {id: '16', name: '', price: '646', ownerId: '3'},
        17: {id: '17', name: '', price: '756', ownerId: '3'},
        18: {id: '18', name: '', price: '50', ownerId: '3'}
    },
    productParticipating: {
        1: {
            1: true,
            3: true
        },
        2: {
            3: true
        },
        3: {
            2: true
        },
        4: {
            1: true,
            3: true
        },
        5: {
            1: true,
            2: true
        },
        6: {},
        7: {
            2: true,
            3: true
        },
        8: {
            1: true,
            2: true,
            3: false
        },
        9: {
            1: true,
            2: true
        },
        10: {
            2: true,
            3: true
        },
        11: {
            1: true,
            2: true,
            3: true
        },
        12: {
            1: true,
            2: true,
            3: true
        },
        13: {
            3: false
        },
        14: {}
    }
};

export const participatingResult = {
    "1": {
        "1": 22.5,
        "3": 22.5
    },
    "2": {
        "3": 234
    },
    "3": {
        "2": 12
    },
    "4": {
        "1": 44.5,
        "3": 44.5
    },
    "5": {
        "1": 32.5,
        "2": 32.5
    },
    "6": {},
    "7": {
        "2": 172.5,
        "3": 172.5
    },
    "8": {
        "1": 117,
        "2": 117
    },
    "9": {
        "1": 445,
        "2": 445
    },
    "10": {
        "2": 617,
        "3": 617
    },
    "11": {
        "1": 223.66666666666666,
        "2": 223.66666666666666,
        "3": 223.66666666666666
    },
    "12": {
        "1": 18.333333333333332,
        "2": 18.333333333333332,
        "3": 18.333333333333332
    },
    "13": {},
    "14": {}
};

export const normalizedFakeState = {
    persons: {
        1: {id: '1', name: 'Mike', share: '40'},
        2: {id: '2', name: 'Jack', share: '60'}
    },
    products: {
        1: {id: '1', name: 'Water', price: '40', ownerId: '1'},
        2: {id: '2', name: 'Milk', price: '60', ownerId: '2'}
    },
    errors: {}
};

export const normalizedBigFakeState = {
    persons: {
        1: {id: '1', name: 'Mike', share: '40'},
        2: {id: '2', name: 'Jack', share: '60'}
    },
    products: {
        1: {id: '1', name: 'Mocha', price: '40', ownerId: '1'},
        2: {id: '2', name: 'Wood', price: '60', ownerId: '1'}
    },
    transactions: [
        {
            from: '1', to: '2', total: '100'
        }
    ],
    errors: {
        products: {
            1: {
                name: ['Name should be a string']
            }
        },
        persons: {
            2: {
                share: ['Share must satisfy expression 0 <= x <= 100']
            }
        },
        common: {
            shareSum: ['Share sum should be equal to 100, not 50']
        }
    },
    common: {
        shareSum: '100'
    }
};

export default fakeState;