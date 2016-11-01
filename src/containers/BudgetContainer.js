import {STUB_BUDGET_ID} from '../state-stub';

import {connect} from 'react-redux';

import Budget from '../components/Budget';

import {fetchBudget} from '../actions';


class BudgetContainer extends React.Component {

    componentDidMount(){

        const budgetIdToFetch = this.props.params.id || STUB_BUDGET_ID;

        this.props.dispatch(fetchBudget(budgetIdToFetch));
    }

    render() {
        return (<Budget {...this.props} />);
    }

}

BudgetContainer.propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    params: React.PropTypes.object
};

export default connect(
    (state)=> {
        return {state};
    },
    (dispatch)=> {
        return {dispatch};
    }
)(BudgetContainer);
