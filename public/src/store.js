import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {reducers, defaultState} from './reducer'
import {stateSyncMiddleware} from './core/state-sync-middleware'

export const generateStore = (args = {}) => {

    _.defaults(args, {reducer: reducers, initialState: defaultState});

    return createStore(
        args.reducer,
        args.initialState,
        compose(
            applyMiddleware(
                thunk,
                stateSyncMiddleware(reducers)
            )
            , typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
        )
    );

};


export const store = generateStore();

export default store;