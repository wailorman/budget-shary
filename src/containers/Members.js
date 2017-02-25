import React, { PropTypes } from 'react';

import { connect } from 'react-redux';
import TextField from 'material-ui/TextField';

import { budgetNameSelector } from '../selectors/budget';
import { personsListSelector } from '../selectors/persons';
import { fetchBudget, changeBudgetProps } from '../actions';
import '../styles/Members.css';

@connect((state, ownProps) => {
    return {
        budgetId: ownProps.params.id,
        budgetName: budgetNameSelector(state),
        personsList: personsListSelector(state)
    };
},
(dispatch, ownProps) => {
    return {
        fetchBudget: () => dispatch(fetchBudget(ownProps.params.id)),
        changeBudgetProps: (event) => dispatch(
            changeBudgetProps(ownProps.params.id, {name: event.target.value})
        )
    };
})
export default class Members extends React.Component {
    static propTypes = {
        budgetId: PropTypes.string,
        budgetName: PropTypes.string,
        fetchBudget: PropTypes.func,
        changeBudgetProps: PropTypes.func
    }

    componentDidMount() {
        this.props.fetchBudget();
    }

    render() {
        const props = this.props;
        console.log('this.props.budgetName', this.props.budgetName);
        return (
            <div className="Members">
                <p>Specify budget name</p>
                <TextField
                    hintText="Budget name"
                    value={props.budgetName}
                    onChange={props.changeBudgetProps}
                    fullWidth={true}/>
            </div>
        );
    }
}
