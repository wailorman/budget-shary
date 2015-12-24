"use strict";

const reactHelper = require('../../helpers/react-helper');
const PersonItem = require('../../../src/components/PersonItem');
const Person = require('../../../src/core/models/person');
const PersonsCollection = require('../../../src/core/collections/persons');

describe("components/PersonItem", ()=> {

    it("should render component with default values", () => {

        let res = reactHelper.render( <PersonItem /> );

        let nameInputValue = res.findOneByClass('PersonItem__person-props_name').children[0].value;
        let shareInputValue = res.findOneByClass('PersonItem__person-props_share').children[0].value;

        expect(nameInputValue).to.eql('');
        expect(shareInputValue).to.eql('');

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
        ReactTestUtils.Simulate.change(shareInput, {target: {value: '0.1'}});

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


    xit("should call removeHandler on delete button click", () => {

        let personsCollection = new PersonsCollection([
            {name: 'Tom', share: 0.25}
        ]);

        let removeHandlerSpy = sinon.spy();

        let res = reactHelper.render(
            <PersonItem person={personsCollection.at(0)} removeHandler={removeHandlerSpy} />
        );

        let removeButton = res.findOneByClass('PersonItem__person-props_remove-person').children[0];

        ReactTestUtils.Simulate.click(removeButton);

        expect(removeHandlerSpy.callCount).to.eql(1);

    });

    xdescribe("getStateByAttributes", ()=> {

        let getStateByAttributes = PersonItem.prototype.getStateByAttributes;

        const nameExpectations = [
            { input: '', output: '' },
            { input: 's', output: 's' },
            { input: 1, output: '1' },
            { input: false, output: '' },
            { input: true, output: '' },
            { input: null, output: '' },
            { input: NaN, output: '' },
            { input: undefined, output: '' }
        ];

        const shareExpectations = [
            { input: '', output: '' },
            { input: 0, output: '' },
            { input: 1, output: '1' },
            { input: 0.5, output: '0.5' },
            { input: NaN, output: '' },
            { input: null, output: '' },
            { input: false, output: '' },
            { input: true, output: '' },
            { input: undefined, output: '' }
        ];

        it(`should apply default Person model values`, () => {

            let person = new Person();

            expect(getStateByAttributes(person.attributes)).to.eql({
                name: '',
                share: ''
            });

        });

        it(`should return empty object if attributes are undefined`, () => {

            expect(getStateByAttributes({})).to.eql({
                name: '',
                share: ''
            });


        });

        nameExpectations.forEach((expectStatement)=> {

            it(`when name='${expectStatement.input}' then func should return '${expectStatement.output}'`, () => {

                expect(getStateByAttributes({name: expectStatement.input}).name).to.eql(expectStatement.output);

            });

        });

        shareExpectations.forEach((expectStatement)=> {

            it(`when share='${expectStatement.input}' then func should return '${expectStatement.output}'`, () => {

                expect(getStateByAttributes({share: expectStatement.input}).share).to.eql(expectStatement.output);

            });

        });
        
    });
    

});