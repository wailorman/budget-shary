import {pushState} from '../core/state-sync'

export const stateSyncMiddleware = (reducer) =>
    (store) => (next) => (action) => {
        const previousState = store.getState();

        const nextState = reducer(previousState, action);

        try {
            pushState(nextState);
        } catch (e) {
            console.error(`Error while pushing the state: ${e}`)
        }

        return next(action);

    };

export default stateSyncMiddleware;