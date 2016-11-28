import shortid from 'shortid';
export const STUB_BUDGET_ID = 'stub';

export const generateBudget = ()=> {
    return {
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
};

export const stateStub = {

    "budget": {
        "id": STUB_BUDGET_ID,
        "name": "Example budget"
    },
    "products": {
        "_product_ryrGguKzg": {
            "id": "_product_ryrGguKzg",
            "name": "Cola",
            "price": "150",
            "ownerId": "_person_S1tZg_KMx"
        },
        "_product_SJtzedKfx": {
            "id": "_product_SJtzedKfx",
            "name": "Chips",
            "price": "50",
            "ownerId": "_person_S1tZg_KMx"
        },
        "_product_rkkXxdKzx": {
            "id": "_product_rkkXxdKzx",
            "name": "Cake",
            "price": "300",
            "ownerId": "_person_S1tZg_KMx"
        },
        "_product_SJSQluYGg": {
            "id": "_product_SJSQluYGg",
            "name": "Flowers",
            "price": "300",
            "ownerId": "_person_ryCZe_tMx"
        },
        "_product_BJYQgOKfg": {
            "id": "_product_BJYQgOKfg",
            "name": "Beer",
            "price": "200",
            "ownerId": "_person_H1Wfe_FMl"
        },
        "_product_Hyk4gdYfl": {
            "id": "_product_Hyk4gdYfl",
            "name": "Nuts",
            "price": "40",
            "ownerId": "_person_H1Wfe_FMl"
        },
        "_product_HyC4eutzx": {
            "id": "_product_HyC4eutzx",
            "name": "Candles",
            "price": "30",
            "ownerId": "_person_ryCZe_tMx"
        }
    },
    "persons": {
        "_person_S1tZg_KMx": {
            "id": "_person_S1tZg_KMx",
            "name": "Mike",
            "share": 28.504672897196258
        },
        "_person_ryCZe_tMx": {
            "id": "_person_ryCZe_tMx",
            "name": "Alice",
            "share": 28.971962616822427
        },
        "_person_H1Wfe_FMl": {
            "id": "_person_H1Wfe_FMl",
            "name": "Jimmy",
            "share": 42.523364485981304
        }
    },
    "productParticipating": {
        "_product_ryrGguKzg": {
            "_person_S1tZg_KMx": true,
            "_person_H1Wfe_FMl": true,
            "_person_ryCZe_tMx": true
        },
        "_product_SJtzedKfx": {
            "_person_S1tZg_KMx": true,
            "_person_H1Wfe_FMl": true
        },
        "_product_rkkXxdKzx": {
            "_person_ryCZe_tMx": true,
            "_person_H1Wfe_FMl": true
        },
        "_product_SJSQluYGg": {
            "_person_S1tZg_KMx": true,
            "_person_H1Wfe_FMl": true,
            "_person_ryCZe_tMx": true
        },
        "_product_HyC4eutzx": {
            "_person_S1tZg_KMx": true,
            "_person_ryCZe_tMx": true,
            "_person_H1Wfe_FMl": true
        },
        "_product_BJYQgOKfg": {
            "_person_S1tZg_KMx": true,
            "_person_H1Wfe_FMl": true
        },
        "_product_Hyk4gdYfl": {
            "_person_S1tZg_KMx": true,
            "_person_H1Wfe_FMl": true
        }
    },
    "transactions": [
        {
            "from": "Jimmy",
            "to": "Mike",
            "total": 200.4
        },
        {
            "from": "Jimmy",
            "to": "Alice",
            "total": 9
        }
    ]

};