"use strict";

const PersonsList = require('../../../src/components/PersonsList/PersonsList');
const PersonsCollection = require('../../../src/core/collections/persons');
const NewPersonButton = require('../../../src/components/NewPersonButton/NewPersonButton');
const PersonItem = require('../../../src/components/PersonItem/PersonItem');

describe("integration/components/PersonsList", ()=> {

    it("should render only + button", () => {

        let persons = new PersonsCollection();

        let list = ReactTestUtils.renderIntoDocument(
            <PersonsList persons={persons} />
        );

        let newPersonButton = ReactTestUtils.findRenderedComponentWithType(
            list, NewPersonButton
        );

        expect(newPersonButton).to.be.instanceOf(NewPersonButton);

        let listOfPersons = ReactTestUtils.scryRenderedComponentsWithType(
            list, PersonItem
        );

        expect(listOfPersons.length).to.eql(0);

    });

    it("should display persons from collection", () => {

        let persons = new PersonsCollection([
            {name: 'Tom'},
            {name: 'Jane'},
            {name: 'Gabriel'}
        ]);

        let list = ReactTestUtils.renderIntoDocument(
            <PersonsList persons={persons} />
        );

        let listOfPersons = ReactTestUtils.scryRenderedComponentsWithType(
            list, PersonItem
        );

        expect(listOfPersons.length).to.eql(3);

    });

    it("should rerender when collection changes", () => {

        let persons = new PersonsCollection([
            {name: 'Jessy'},
            {name: 'Jack'},
            {name: 'Anton'}
        ]);

        let list = ReactTestUtils.renderIntoDocument(
            <PersonsList persons={persons} />
        );

        persons.remove(persons.at(0));

        let listOfPersons;

        listOfPersons = ReactTestUtils.scryRenderedComponentsWithType(
            list, PersonItem
        );

        expect(listOfPersons.length).to.eql(2);

        persons.add({name: 'Tommy'});

        listOfPersons = ReactTestUtils.scryRenderedComponentsWithType(
            list, PersonItem
        );

        expect(listOfPersons.length).to.eql(3);

    });
    
    it(`should remove person from collection`, () => {

        let personsCollection = new PersonsCollection([
            {name: 'Jane', share: 0.8}
        ]);

        let component = ReactTestUtils.renderIntoDocument(<PersonsList persons={personsCollection} />);
        let personItemInstance = ReactTestUtils.findRenderedComponentWithType(component, PersonItem);
        let removeButtonDiv = ReactTestUtils.findRenderedDOMComponentWithClass(
            personItemInstance, 'PersonItem__person-props_remove-person'
        );
        let removeButton = removeButtonDiv.children[0];

        expect(personsCollection.length).to.eql(1);

        ReactTestUtils.Simulate.click(removeButton);

        expect(personsCollection.length).to.eql(0);

    });

});