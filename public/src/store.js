import { createStore, applyMiddleware } from 'redux';
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
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : undefined
);

export const generateStore = (initialState) => {

    return createStore(reducers, initialState, applyMiddleware(thunk));

};

export default store;