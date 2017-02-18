import { Map, OrderedMap, List } from 'immutable';

export const initialState = {
    budgetsList: OrderedMap({}),
    budget: Map({}),
    persons: OrderedMap({}),
    products: {},
    productParticipating: {},
    transactions: [],
    common: {},
    errors: {
        products: {},
        persons: {},
        common: {}
    }

};