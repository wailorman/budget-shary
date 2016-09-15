import {proceedInterchange} from '../core/interchange-utils'
import {PROCEED_INTERCHANGE} from '../actions'

export const interchangeMiddleware = (store)=> (next)=> (action)=> {

    if (action.type == PROCEED_INTERCHANGE) {

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