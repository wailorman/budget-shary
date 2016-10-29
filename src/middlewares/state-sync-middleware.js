import {pushBudget, fetchBudget} from '../core/state-sync';
import {FETCH_BUDGET} from '../actions';

export const stateSyncMiddleware = (reducer) =>
    (store) => (next) => (action) => {

        let newAction = _.cloneDeep(action);

        switch (action.type){
            case FETCH_BUDGET:
            {
                newAction.result = fetchBudget({returnStubIfEmpty: true});

                return next(newAction);
            }
            default:
            {
                // sync state with localStorage

                const previousState = store.getState();

                const nextState = reducer(previousState, action);

                try {
                    pushBudget(nextState);
                } catch (e) {
                    console.error(`Error while pushing the state: ${e}`);
                }

                return next(action);
            }
        }

    };

export default stateSyncMiddleware;