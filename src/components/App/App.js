"use strict";

const React = require('react');
const BudgetBar = require('../BudgetBar');
const Budget = require('../../core/models/budget');

const PersonsList = require('../PersonsList');

require('./App.less');

let App = module.exports = React.createClass({

    getInitialState() {
        let budget = new Budget();

        return {
            budget: budget,
            persons: budget.get('persons')
        };
    },



    render() {
        return (
            <div className="App">
                <BudgetBar budget={this.state.budget}/>
                <PersonsList persons={this.state.persons} />
            </div>
        );
    }

});