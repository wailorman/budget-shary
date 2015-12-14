"use strict";

const PersonsCollection = require('../../../../src/core/collections/persons');
const Person = require('../../../../src/core/models/person');

describe('PersonsCollection collection', ()=> {

    let testPersonsAttrs = [
        {
            name: 'Thomas',
            share: 0.25
        },
        {
            name: 'Jack',
            share: 0.25
        },
        {
            name: 'George',
            share: 0.5
        }
    ];

    let testPersons = [
        new Person(testPersonsAttrs[0]),
        new Person(testPersonsAttrs[1]),
        new Person(testPersonsAttrs[2])
    ];

    it("should create persons collection", () => {

        let persons = new PersonsCollection(testPersons);

        assert.equal( persons.get(testPersons[0].cid), testPersons[0], "Models were inserted incorrectly" );

    });

});