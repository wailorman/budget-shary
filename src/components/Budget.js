import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import '../styles/Budget.css';

import ValidationErrorsList from './ValidationErrorsList';
import TransactionsList from './TransactionsList';
import BudgetName from './BudgetName';
import PersonsList from '../containers/PersonsList';

import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';

import * as actionCreators from '../actions';
import {STUB_BUDGET_ID} from '../state-stub';


@connect(
    (state)=> {
        return {
            state,
            commonErrors: state.errors.common
        };
    },
    (dispatch)=> {
        return {
            dispatch,
            fetchBudget: bindActionCreators(actionCreators.fetchBudget, dispatch)
        };
    }
)
export class Budget extends React.Component {

    componentDidMount(){

        const budgetIdToFetch = this.props.params.id || STUB_BUDGET_ID;

        this.props.fetchBudget(budgetIdToFetch);
    }

    render() {

        const {
            state, dispatch,
            commonErrors
        } = this.props;

        const actions = bindActionCreators(actionCreators, dispatch);

        return (
            <div className="Budget">

                <BudgetName name={state.budget.name}
                            onChange={actions.changeBudgetProps.bind(null)}/>

                <PersonsList/>

                <RaisedButton
                    backgroundColor="#294E6B"
                    labelColor="white"
                    onClick={actions.newPerson}
                    icon={<FontIcon className="material-icons">add</FontIcon>}
                    label="New person"
                />

                <ValidationErrorsList errors={commonErrors}/>

                <br /><br />

                <RaisedButton
                    backgroundColor="#009688"
                    labelColor='white'
                    onClick={actions.realizeInterchange}
                    label="Calculate" fullWidth={true}
                />

                <TransactionsList/>

            </div>
        );
    }

    static propTypes = {
        state: React.PropTypes.object.isRequired,
        dispatch: React.PropTypes.func.isRequired,

        params: React.PropTypes.object,

        commonErrors: React.PropTypes.object,
        fetchBudget: React.PropTypes.func
    }

}

export default Budget;