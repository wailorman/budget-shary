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
    (state, ownProps)=> {
        return {
            requestedBudgetId: ownProps.params.id || STUB_BUDGET_ID,
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
    },
    (stateProps, dispatchProps)=>{
        return Object.assign({}, stateProps, dispatchProps);
    }
)
export class Budget extends React.Component {

    shouldComponentUpdate(nextProps) {
        const shouldUpdate =    this.props.requestedBudgetId !== nextProps.requestedBudgetId ||
                                this.props.budgetName !== nextProps.budgetName ||
                                this.props.commonErrors !== nextProps.commonErrors;

        return shouldUpdate;
    }

    componentDidMount(){

        this.props.fetchBudget(this.props.requestedBudgetId);

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

        requestedBudgetId: React.PropTypes.string,
        commonErrors: React.PropTypes.object,
        budgetName: React.PropTypes.string,
        fetchBudget: React.PropTypes.func,
        onChangeBudget: React.PropTypes.func,
        onRealizeInterchange: React.PropTypes.func
    }

}

export default Budget;