import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {reducer, defaultState} from './reducers/reducers';

import {stateSyncMiddleware} from './middlewares/state-sync-middleware';
import {shareSumMiddleware} from './middlewares/share-sum-middleware';
import {validationMiddleware} from './middlewares/validation-middleware';
import {interchangeMiddleware} from './middlewares/interchange-middleware';

import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import { hashHistory } from 'react-router';
import defaults from 'lodash/defaults';

/**
 * Redux store factory
 *
 * @param [args] {object}
 * @param [args.reducer]
 * @param [args.initialState]
 * @returns Redux store
 */
export const generateStore = (args = {}) => {

    defaults(args, {reducer: reducer, initialState: defaultState});

    return createStore(
        args.reducer,
        args.initialState,
        compose(
            applyMiddleware(
                thunk,
                routerMiddleware(hashHistory),

                interchangeMiddleware(reducer),
                shareSumMiddleware(reducer),

                stateSyncMiddleware(reducer),
                validationMiddleware(reducer)
            )
            , typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
        )
    );

};


export const store = generateStore();

export const history = syncHistoryWithStore(hashHistory, store);

export default store;