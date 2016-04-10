import { createStore } from 'redux';
import { reducer, defaultState } from './reducer'

export const store = createStore( reducer, defaultState );

export default store;