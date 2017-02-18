import { Map, OrderedMap } from 'immutable';

export const initialState = {
    budgetsList: OrderedMap({}),
    budget: Map({}),
    persons: OrderedMap({}),
    products: OrderedMap({}),
    productParticipating: {},
    transactions: [],
    common: {},
    errors: {
        products: {},
        persons: {},
        common: {}
    }

};