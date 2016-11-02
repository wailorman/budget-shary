import {connect} from 'react-redux';

import {fetchBudgetsList} from '../actions';

import BudgetsList from '../components/BudgetsList';


class BudgetContainer extends React.Component {

    componentDidMount(){
        this.props.dispatch(fetchBudgetsList());
    }

    render() {
        return (<BudgetsList {...this.props} />);
    }

}

BudgetContainer.propTypes = {
    dispatch: React.PropTypes.func.isRequired
};

export default connect(
    (state)=> {
        return {budgetsList: state.budgetsList};
    },
    (dispatch)=> {
        return {dispatch};
    }
)(BudgetContainer);
