import {connect} from 'react-redux';

import BudgetsList from '../components/BudgetsList';


class BudgetContainer extends React.Component {

    componentDidMount(){

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
        return {state};
    },
    (dispatch)=> {
        return {dispatch};
    }
)(BudgetContainer);
