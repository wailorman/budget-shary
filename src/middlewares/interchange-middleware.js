import {
    proceedInterchange, 
    productParticipatingToPersonShares
} from '../core/interchange/interchange';

import {
    PROCEED_INTERCHANGE, TOGGLE_PARTICIPATION
} from '../actions';

export const interchangeMiddleware = (reducer)=> (store)=> (next)=> (action)=> {

    if (action.type == TOGGLE_PARTICIPATION) {

        let newAction = _.clone(action);

        const state = reducer(store.getState(), action);

        try {

            const result = productParticipatingToPersonShares(
                state.productParticipating,
                state.persons,
                state.products
            );

            _.set(newAction, 'meta.newPersonShares', result);

        } catch (e) {
            console.error(`productParticipating converting error`);
            console.error(e);
        }

        return next(newAction);


    } else if (action.type == PROCEED_INTERCHANGE) {

        let newAction = _.clone(action);

        const state = store.getState();

        try {
            const result = proceedInterchange(state).transactions;
            _.set(newAction, 'meta.transactions', result);
        } catch (e) {
            console.error(`Interchange proceeding error`);
            console.error(e);
        }

        return next(newAction);

    } else {

        return next(action);

    }

};

export default interchangeMiddleware;