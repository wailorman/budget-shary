import shortid from 'shortid';
export const STUB_BUDGET_ID = 'stub';

export const stateStub = {

    budget: {
        id: STUB_BUDGET_ID,
        name: 'Pretty budget'
    },
    persons: {
        _1: {id: '_1', name: 'Jack', share: '30'},
        _2: {id: '_2', name: 'Alice', share: '60'},
        _3: {id: '_3', name: 'Mike', share: '10'}
    },
    products: {
        _1: {id: '_1', name: 'Milk', price: '45', ownerId: '_1'},
        _2: {id: '_2', name: 'Beer', price: '234', ownerId: '_1'},
        _3: {id: '_3', name: 'Chips', price: '12', ownerId: '_1'},
        _4: {id: '_4', name: 'Water', price: '89', ownerId: '_1'},
        _5: {id: '_5', name: 'Apples', price: '65', ownerId: '_1'},
        _6: {id: '_6', name: 'Alcohol', price: '234', ownerId: '_1'},

        _7: {id: '_7', name: 'Cigarettes', price: '345', ownerId: '_2'},
        _8: {id: '_8', name: 'Potatoes', price: '234', ownerId: '_2'},
        _9: {id: '_9', name: 'Fish', price: '890', ownerId: '_2'},
        _10: {id: '_10', name: 'Beef', price: '1234', ownerId: '_2'},
        _11: {id: '_11', name: 'Water', price: '671', ownerId: '_2'},
        _12: {id: '_12', name: 'Sweets', price: '55', ownerId: '_2'},
        _13: {id: '_13', name: 'Tomatoes', price: '176', ownerId: '_2'},
        _14: {id: '_14', name: 'Gears', price: '1876', ownerId: '_2'},

        _15: {id: '_15', name: 'Tongs', price: '504', ownerId: '_3'},
        _16: {id: '_16', name: 'Wine', price: '646', ownerId: '_3'},
        _17: {id: '_17', name: 'Cake', price: '756', ownerId: '_3'},
        _18: {id: '_18', name: 'Chips', price: '50', ownerId: '_3'}
    },
    productParticipating: {},
    transactions: [],
    errors: {
        products: {},
        persons: {},
        common: {}
    }

};

export const initialBudgetState = {
    budget: {
        id: `_b_${shortid.generate()}`,
        name: ''
    },
    persons: {},
    products: {},
    productParticipating: {},
    transactions: [],
    errors: {
        products: {},
        persons: {},
        common: {}
    }
};