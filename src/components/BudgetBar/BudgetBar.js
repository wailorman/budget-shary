"use strict";

const React = require('react');
const budgetActions = require('../../actions/actions').budget;
const _ = require('lodash');

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

        let budget = this.props.budget || {attributes: {}};
        let attrs = _.defaultsDeep(budget.attributes, {
            name: ''
        });

        return {
            name: attrs.name
        };

    },

    handleNameChange(event) {

        let newName = event.target.value;
        this.props.budget.set({name: newName});
        this.setState({name: newName});

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