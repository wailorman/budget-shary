import {createSelector} from 'reselect';
import {budgetNameSelector} from './budget';

// todo Temporary. Until I'll create special state variable
export const getLabel = (state) => state.budget.get('name');
