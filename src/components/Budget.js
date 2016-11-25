import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import '../styles/Budget.css';

import ValidationErrorsList from './ValidationErrorsList';
import TransactionsList from './TransactionsList';
import BudgetName from './BudgetName';
import PersonsList from '../containers/PersonsList';

import RaisedButton from 'material-ui/RaisedButton';

import * as actionCreators from '../actions';
import {STUB_BUDGET_ID} from '../state-stub';


@connect(
    (state)=> {
        return {
            budgetName: state.budget.name,
            commonErrors: state.errors.common
        };
    },
    (dispatch)=> {
        return {
            fetchBudget: bindActionCreators(actionCreators.fetchBudget, dispatch),
            onChangeBudget: bindActionCreators(actionCreators.changeBudgetProps, dispatch),
            onRealizeInterchange: bindActionCreators(actionCreators.realizeInterchange, dispatch)
        };
    }
)
export class Budget extends React.Component {

    componentDidMount(){

        const budgetIdToFetch = this.props.params.id || STUB_BUDGET_ID;

        this.props.fetchBudget(budgetIdToFetch);
    }

    render() {

        return (
            <div className="Budget">

                <BudgetName name={this.props.budgetName}
                            onChange={this.props.onChangeBudget}/>

                <PersonsList/>

                <ValidationErrorsList errors={this.props.commonErrors}/>

                <br /><br />

                <RaisedButton
                    backgroundColor="#009688"
                    labelColor='white'
                    onClick={this.props.onRealizeInterchange}
                    label="Calculate" fullWidth={true}
                />

                <TransactionsList/>

            </div>
        );
    }

    static propTypes = {
        params: React.PropTypes.object,

        commonErrors: React.PropTypes.object,
        budgetName: React.PropTypes.string,
        fetchBudget: React.PropTypes.func,
        onChangeBudget: React.PropTypes.func,
        onRealizeInterchange: React.PropTypes.func
    }

}

export default Budget;