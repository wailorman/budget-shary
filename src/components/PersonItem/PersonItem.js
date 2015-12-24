"use strict";

const React = require('react');
const ProductItem = require('../ProductItem/ProductItem');
const AddProductItem = require('../AddProductItem/AddProductItem');
const PersonsCollection = require('../../core/collections/persons');
const _ = require('lodash');

require('./PersonItem.less');

let PersonItem = module.exports = React.createClass({

    propTypes: {
        person: React.PropTypes.instanceOf(PersonsCollection)/*,
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

        if (!person) return {name: '', share: ''};

        let share = person.get('share');

        return {
            name: person.get('name'),
            share: share ? person.get('share') : ''
        };
    },

    //getStateByAttributes(attributes) {
    //
    //    if (!attributes) attributes = {};
    //
    //    attributes = _.defaults({
    //        name: '',
    //        share: ''
    //    });
    //
    //    return _.transform(attributes, (result, n, key)=> {
    //        let type = typeof attributes[key];
    //
    //        if (attributes[key] && (type == 'string' || type == 'number' )) {
    //            result[key] = String(attributes[key]);
    //        }else{
    //            result[key] = '';
    //        }
    //    });
    //
    //},

    changeName(event) {

        if (!this.props.person) return undefined;

        let newName = event.target.value;

        this.props.person.set('name', newName);

        this.setState({name: newName});

    },
    changeShare(event) {

        if (!this.props.person) return undefined;

        let newShareStringFromInput = event.target.value;
        let newShare = parseFloat(newShareStringFromInput ? newShareStringFromInput : 0);

        if (newShare)
            this.props.person.set('share', newShare);

        this.setState({share: newShareStringFromInput})

    },
    //removePerson(){
    //
    //    if (!this.props.removeHandler) return undefined;
    //
    //    this.props.removeHandler();
    //
    //},

    render() {

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
                        <input type="text"
                               value={this.state.share}
                               onChange={this.changeShare}
                               placeholder="Share"/>
                    </div>

                    <div className="PersonItem__person-props_remove-person">
                        <button></button>
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