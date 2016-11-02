import {pushBudget, fetchBudget} from '../core/state-sync';
import {
    FETCH_BUDGET,

    budgetSyncActions
} from '../actions';

export const stateSyncMiddleware = (reducer, deps = {}) =>
    (store) => (next) => (action) => {

        _.defaultsDeep(deps, {
            fetchBudget: fetchBudget,
            pushBudget: pushBudget
        });

        let newAction = _.cloneDeep(action);

        switch (action.type){
            case FETCH_BUDGET:
            {
                newAction.result = deps.fetchBudget({id: action.id});

                return next(newAction);
            }
            default:
            {
                // sync state with localStorage

                if (budgetSyncActions.indexOf(action.type) > -1) {

                    const previousState = store.getState();

                    const nextState = reducer(previousState, action);

                    try {
                        deps.pushBudget(nextState);
                    } catch (e) {
                        console.error(`Error while pushing the state: ${e}`);
                    }

                }

                return next(action);

            }
        }

    };

export default stateSyncMiddleware;