"use strict";

const React = require('react');
const ProductItem = require('../ProductItem/ProductItem');
const AddProductItem = require('../AddProductItem/AddProductItem');
const PersonsCollection = require('../../core/collections/persons');
const Person = require('../../core/models/person');
const improvedParseInt = require('../../lib/improved-parse-int');
const _ = require('lodash');
const actionCreator = require('../../actions/actions');

require('./PersonItem.less');

let PersonItem = module.exports = React.createClass({

    propTypes: {
        person: React.PropTypes.instanceOf(Person)/*,
        removeHandler: React.PropTypes.func*/
    },

    componentWillMount() {

        let person = this.props.person;

        if (person) {
            person.on('change', (newModel)=> {
                this.setState(newModel.attributes);
            });
        }

    },


    getInitialState() {
        let person = this.props.person;

        if (!person) return {name: '', share: 0};

        let share = person.get('share');

        return {
            name: person.get('name'),
            share: share === 0 || share ? person.get('share') : '',
            _: {
                valid: {
                    name: true,
                    share: true
                }
            }
        };
    },

    changeName(event) {

        if (!this.props.person) return undefined;

        let newName = event.target.value;

        this.props.person.set('name', newName);

        this.setState({name: newName});

    },

    parseShare(typedShare){
        return improvedParseInt(typedShare);
    },

    convertParsedShareForModel(parsedShare){
        return parsedShare * 0.01;
    },

    isConvertedShareValid(convertedShare){
        return Person.prototype.validate({share: convertedShare}) ? false : true;
    },

    handleShareChange(event) {

        let typedShare = event.target.value,
            parsedShare = this.parseShare(typedShare),
            convertedShare = this.convertParsedShareForModel(parsedShare);

        actionCreator.person.update(this.props.person, {share: convertedShare});

        this.setState({share: typedShare});

    },

    handleRemoveButtonClick() {

        actionCreator.person.delete(this.props.person);

    },

    render() {


        // todo: Highlight incorrect PersonItem

        return (
            <div className="PersonItem">

                <div className="PersonItem__person-props">
                    <div className="PersonItem__person-props_name">
                        <input type="text"
                               value={this.state.name}
                               onChange={this.changeName}
                               placeholder="Person"/>
                    </div>

                    <div className="PersonItem__person-props_share">
                        <input type="number"
                               value={this.state.share}
                               onChange={this.handleShareChange}
                               placeholder="Share (%)"/>
                    </div>

                    <div className="PersonItem__person-props_remove-person">
                        <button onClick={this.handleRemoveButtonClick}></button>
                    </div>
                </div>

                <div className="PersonItem__products">

                    Purchased products:
                    <ProductItem />
                    <AddProductItem />

                </div>

            </div>
        );
    }

});