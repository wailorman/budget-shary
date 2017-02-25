import { List, Map, OrderedMap } from 'immutable';

export const initialState = {
    budgetsList: OrderedMap({}),
    budget: Map({}),
    persons: OrderedMap({}),
    products: OrderedMap({}),
    productParticipating: Map({}),
    transactions: List([]),
    common: Map({}),
    errors: Map({})

};
