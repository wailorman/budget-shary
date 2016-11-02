import {bindActionCreators} from 'redux';

import BudgetListElem from './BudgetsListElem';

import * as actionCreators from '../actions';

export const BudgetsList = ({budgetsList, dispatch})=> {

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
    budgetsList: React.PropTypes.object.isRequired,
    dispatch: React.PropTypes.func.isRequired
};

export default BudgetsList;