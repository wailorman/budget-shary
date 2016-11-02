import {bindActionCreators} from 'redux';

import BudgetListElem from './BudgetsListElem';

import * as actionCreators from '../actions';

const budgetsList = {
    _b_1: {
        id: '_b_1',
        name: 'First budget'
    },
    stub: {
        id: 'stub',
        name: 'Second budget'
    },
    _b_3: {
        id: '_b_3',
        name: 'Third budget'
    }
};

export const BudgetsList = ({dispatch})=> {

    const actions = bindActionCreators(actionCreators, dispatch);

    return (
        <div className="BudgetsList">

            <button onClick={actions.newBudget}>New budget</button>

            {_.map(budgetsList, (budget)=> {

                return (
                    <BudgetListElem
                        key={budget.id}
                        {...budget}
                    />
                );

            })}

        </div>
    );

};

BudgetsList.propTypes = {
    state: React.PropTypes.object.isRequired,
    dispatch: React.PropTypes.func.isRequired
};

export default BudgetsList;