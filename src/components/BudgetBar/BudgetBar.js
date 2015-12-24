"use strict";

const React = require('react');
const budgetActions = require('../../actions/budget-actions');

require('./BudgetBar.less');

let BudgetBar = module.exports = React.createClass({

    componentWillMount() {

        let budget = this.props.budget;
        if (budget) {

            budget.on('change', (freshModel)=> {

                this.setState(freshModel.attributes);

            });

        }

    },


    getInitialState() {

        let budget = this.props.budget;

        return {
            name: budget ? budget.get('name') : ''
        };

    },

    handleNameChange(event) {

        let newName = event.target.value;
        budgetActions.update({name: newName});

    },

    render() {
        return (
            <div className="BudgetBar">
                <div className="BudgetBar__budget-name">
                    <input type="text"
                           value={this.state.name}
                           onChange={this.handleNameChange}
                           placeholder="Budget name"/>
                </div>
            </div>
        );
    }

});