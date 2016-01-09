"use strict";

const NewPersonButton = require('../../../src/components/NewPersonButton/NewPersonButton');
const PersonsCollection = require('../../../src/core/collections/persons');

describe("integration/components/NewPersonsButton", ()=> {

    it("should not add person to collection", () => {

        let persons = new PersonsCollection([
            {name: 'Naomi'}
        ]);

        let btn = ReactTestUtils.renderIntoDocument(
            <NewPersonButton />
        );

        let btnDOM = ReactTestUtils.findRenderedDOMComponentWithTag(btn, 'button');

        ReactTestUtils.Simulate.click(btnDOM, {});

        expect(persons.length).to.eql(1);

    });

    it("should add persons to collection", () => {

        let testPersons = new PersonsCollection([
            {name: 'Naomi'}
        ]);

        let btn = ReactTestUtils.renderIntoDocument(
            <NewPersonButton collection={testPersons}/>
        );

        let btnDOM = ReactTestUtils.findRenderedDOMComponentWithTag(btn, 'button');

        ReactTestUtils.Simulate.click(btnDOM, {});

        expect(testPersons.length).to.eql(2);

    });

});