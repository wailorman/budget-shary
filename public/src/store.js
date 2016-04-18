import { createStore } from 'redux';
import { reducers, defaultState } from './reducer'

try {
    global.window = window ? window : {};
} catch (e) {
    global.window = {};
}

export const store = createStore(
    reducers,
    defaultState,
    window.devToolsExtension ? window.devToolsExtension() : undefined
);

export const generateStore = (initialState) => {

    return createStore(reducers, initialState);

};

export default store;