"use strict";

const React = require('react');
const PersonItem = require('../PersonItem/PersonItem');

const PersonsCollection = require('../../core/collections/persons');
const NewPersonButton = require('../NewPersonButton/NewPersonButton');

const PersonsList = module.exports = React.createClass({

    componentWillMount() {

        this.props.persons.on('add remove', (newCollection)=> {
            this.setState(newCollection);
        });

    },

    // todo Remove children person handler
    // Define model to remove in THIS component.
    // Not in PersonItem component

    propTypes: {
        persons: React.PropTypes.instanceOf(PersonsCollection).isRequired
    },

    /*removePersonItemHandler(model) {

        let collection = this.props.persons;

        return function () {
            collection.remove(model);
        };

    },*/

    render() {

        let i = 0;

        return (
            <div>

                {this.props.persons.map((person)=> {
                    i++;
                    return (
                        <PersonItem key={i} person={person}/>
                    );
                })}

                <NewPersonButton collection={this.props.persons}/>


            </div>
        );
    }
});
