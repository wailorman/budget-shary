import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {reducer, defaultState} from './reducer'
import {stateSyncMiddleware} from './middlewares/state-sync-middleware'
import {shareSumMiddleware} from './middlewares/share-sum-middleware'
import {validationMiddleware} from './middlewares/validation-middleware'

/**
 * Redux store factory
 *
 * @param [args] {object}
 * @param [args.reducer]
 * @param [args.initialState]
 * @returns Redux store
 */
export const generateStore = (args = {}) => {

    _.defaults(args, {reducer: reducer, initialState: defaultState});

    return createStore(
        args.reducer,
        args.initialState,
        compose(
            applyMiddleware(
                thunk,
                shareSumMiddleware(reducer),
                validationMiddleware(reducer),
                stateSyncMiddleware(reducer)
            )
            , typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
        )
    );

};


export const store = generateStore();

export default store;