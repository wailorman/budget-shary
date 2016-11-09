import {bindActionCreators} from 'redux';

import BudgetListElem from './BudgetsListElem';

import {List} from 'material-ui/List';
import {ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';

import * as actionCreators from '../actions';
import '../styles/BudgetsList.css';

export const BudgetsList = ({budgetsList, dispatch})=> {

    const actions = bindActionCreators(actionCreators, dispatch);

    return (
        <List className="BudgetsList">

            <Subheader>Saved budgets</Subheader>

            <Divider/>

            {_.map(budgetsList, (budget)=> {

                return (
                    <BudgetListElem
                        key={budget.id}
                        onRemove={actions.deleteBudget.bind(null, budget.id)}
                        {...budget}
                    />
                );

            })}

            <ListItem
                secondaryText={
                    <button onClick={actions.newBudget}>New budget</button>
                }
            />

        </List>
    );

};

BudgetsList.propTypes = {
    budgetsList: React.PropTypes.object.isRequired,
    dispatch: React.PropTypes.func.isRequired
};

export default BudgetsList;