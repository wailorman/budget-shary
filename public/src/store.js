import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { reducers, defaultState } from './reducer'

try {
    global.window = window ? window : {};
} catch (e) {
    global.window = {};
}

export const store = createStore(
    reducers,
    defaultState,
    compose(
        applyMiddleware(thunk)
        //window && window.devToolsExtension ? window.devToolsExtension() : function () {}
    )
);

export const generateStore = (initialState) => {

    return createStore(reducers, initialState, applyMiddleware(thunk));

};

export default store;