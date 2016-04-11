import { createStore } from 'redux';
import { reducers, defaultState } from './reducer'

export const store = createStore(
    reducers,
    defaultState,
    window.devToolsExtension ? window.devToolsExtension() : undefined
);

export const generateStore = (initialState) => {

    return createStore(reducers, initialState);

};

export default store;