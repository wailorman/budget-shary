import {pushBudget, fetchBudget} from '../core/state-sync';
import {
    FETCH_BUDGET,

    REMOVE_PRODUCT,
    NEW_PRODUCT,
    CHANGE_PRODUCT,
    REMOVE_PERSON,
    NEW_PERSON,
    CHANGE_PERSON,
    PROCEED_INTERCHANGE,
    CHANGE_BUDGET_PROPS,
    TOGGLE_PARTICIPATION
} from '../actions';

const actionsToBeSynced = [
    REMOVE_PRODUCT,
    NEW_PRODUCT,
    CHANGE_PRODUCT,
    REMOVE_PERSON,
    NEW_PERSON,
    CHANGE_PERSON,
    PROCEED_INTERCHANGE,
    CHANGE_BUDGET_PROPS,
    TOGGLE_PARTICIPATION
];

export const stateSyncMiddleware = (reducer) =>
    (store) => (next) => (action) => {

        let newAction = _.cloneDeep(action);

        switch (action.type){
            case FETCH_BUDGET:
            {
                newAction.result = fetchBudget({id: action.id});

                return next(newAction);
            }
            default:
            {
                // sync state with localStorage

                // todo: test it!
                if (action.type in actionsToBeSynced) {

                    const previousState = store.getState();

                    const nextState = reducer(previousState, action);

                    try {
                        pushBudget(nextState);
                    } catch (e) {
                        console.error(`Error while pushing the state: ${e}`);
                    }

                }

                return next(action);

            }
        }

    };

export default stateSyncMiddleware;