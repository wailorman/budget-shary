"use strict";

const React = require('react');
const PersonsCollection = require('../../core/collections/persons');
const personActions = require('../../actions/actions').person;

require('./NewPersonButton.less');

let NewPersonButton = module.exports = React.createClass({

    propTypes: {
        collection: React.PropTypes.instanceOf(PersonsCollection)
    },

    handleClick() {

        let collection = this.props.collection;

        personActions.create(collection);

    },

    render() {
        return (
            <div>
                <button className="btn btn-default" onClick={this.handleClick}>+ New person</button>
            </div>
        );
    }

});