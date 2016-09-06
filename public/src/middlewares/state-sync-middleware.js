import {pushState, fetchState} from '../core/state-sync'
import {FETCH_BUDGET} from '../actions'

export const stateSyncMiddleware = (reducer) =>
    (store) => (next) => (action) => {

        let newAction = _.cloneDeep(action);

        switch (action.type){
            case FETCH_BUDGET:
                
                newAction.result = fetchState();
                
                return newAction;
            default:

                // sync state with localStorage

                const previousState = store.getState();

                const nextState = reducer(previousState, action);

                try {
                    pushState(nextState);
                } catch (e) {
                    console.error(`Error while pushing the state: ${e}`)
                }

                return next(action);
        }

    };

export default stateSyncMiddleware;