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

            {budgetsList.map(budget => {

                return (
                    <BudgetListElem
                        key={budget.get('id')}
                        id={budget.get('id')}
                        name={budget.get('name')}
                        onRemove={actions.deleteBudget.bind(null, budget.id)}
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
    budgetsList: Immutable.Map.isMap,
    dispatch: React.PropTypes.func.isRequired
};

export default BudgetsList;