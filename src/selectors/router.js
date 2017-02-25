import {createSelector} from 'reselect';

export const getPath = (state) => state.routing.locationBeforeTransitions.pathname;
