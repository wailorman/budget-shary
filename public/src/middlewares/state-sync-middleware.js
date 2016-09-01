import {pushState} from '../core/state-sync'

export const stateSyncMiddleware = (reducer) =>
    (store) => (next) => (action) => {
        const previousState = store.getState();

        const nextState = reducer(previousState, action);

        // todo: check success pushing
        pushState(nextState);

        return next(action);

    };

export default stateSyncMiddleware;