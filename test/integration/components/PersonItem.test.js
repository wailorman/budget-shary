"use strict";

const reactHelper = require('../../helpers/react-helper');
const PersonItem = require('../../../src/components/PersonItem/PersonItem');
const Person = require('../../../src/core/models/person');
const PersonsCollection = require('../../../src/core/collections/persons');

describe("integration/components/PersonItem", ()=> {

    it("should render component with default values", () => {

        let res = reactHelper.render( <PersonItem /> );

        let nameInputValue = res.findOneByClass('PersonItem__person-props_name').children[0].value;
        let shareInputValue = res.findOneByClass('PersonItem__person-props_share').children[0].value;

        expect(nameInputValue).to.eql('');
        expect(shareInputValue).to.eql('0');

    });

    it("should render component with custom model values", () => {

        let person = new Person({name: 'Jimmy', share: 0.5});

        let res = reactHelper.render( <PersonItem person={person} /> );

        let nameInputValue = res.findOneByClass('PersonItem__person-props_name').children[0].value;
        let shareInputValue = res.findOneByClass('PersonItem__person-props_share').children[0].value;

        expect(nameInputValue).to.eql('Jimmy');
        expect(shareInputValue).to.eql('0.5');

    });

    it("should change model after input changing", () => {

        let person = new Person({name: 'Jimmy', share: 0.5});

        let component = reactHelper.render( <PersonItem person={person} /> );

        let nameInput = component.findOneByClass('PersonItem__person-props_name').children[0];
        let shareInput = component.findOneByClass('PersonItem__person-props_share').children[0];

        ReactTestUtils.Simulate.change(nameInput, {target: {value: 'Jack'}});
        ReactTestUtils.Simulate.change(shareInput, {target: {value: '10'}});

        expect(person.get('name')).to.eql('Jack');
        expect(person.get('share')).to.eql(0.1);

    });

    it("should rerender component when model changes", () => {

        let person = new Person({name: 'Jimmy', share: 0.5});

        let res = reactHelper.render( <PersonItem person={person} /> );

        person.set({
            name: 'Sam',
            share: 0.7
        });

        let nameInputValue = res.findOneByClass('PersonItem__person-props_name').children[0].value;
        let shareInputValue = res.findOneByClass('PersonItem__person-props_share').children[0].value;

        expect(nameInputValue).to.eql('Sam');
        expect(shareInputValue).to.eql('0.7');

    });

});