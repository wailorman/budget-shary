import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { reducers, defaultState } from './reducer'
import {stateSyncMiddleware} from './core/state-sync-middleware'


export const store = createStore(
    reducers,
    defaultState,
    compose(
        applyMiddleware(
            thunk,
            stateSyncMiddleware(reducers)
        )
        , typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
    )
);

export const generateStore = (initialState) => {

    return createStore(reducers, initialState, applyMiddleware(thunk));

};

export default store;