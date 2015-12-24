"use strict";

const PersonsCollection = require('../../../../src/core/collections/persons');
const Person = require('../../../../src/core/models/person');
const Dispatcher = require('../../../../src/dispatcher/dispatcher');
const actionNames = require('../../../../src/constants/action-names');

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

    describe("dispatcher", ()=> {

        it("should add new empty model on 'person-create'", () => {

            let persons = new PersonsCollection(testPersons);
            let spy = sinon.spy();

            expect(persons.length).to.eql(testPersons.length);

            persons.on('add', spy);

            Dispatcher.dispatch({
                eventName: actionNames.person.create,
                collection: persons
            });

            expect(spy.lastCall.args[1].length).to.eql(4);
            expect(persons.at(3).get('share')).to.eql(0);

        });

        it("should handle only for collection which passed with payload", () => {

            let persons1 = new PersonsCollection(testPersons);
            let persons2 = new PersonsCollection(testPersons);

            let spy1 = sinon.spy();
            let spy2 = sinon.spy();

            persons1.on('add', spy1);
            persons2.on('add', spy2);

            Dispatcher.dispatch({
                eventName: actionNames.person.create,
                collection: persons2
            });

            expect(spy1.callCount).to.eql(0);
            expect(spy2.calledOnce).to.be.true;
            expect(spy2.lastCall.args[1].length).to.eql(4);

        });

        it("should delete model from collection", () => {

            let persons = new PersonsCollection(testPersons);
            let spy = sinon.spy();

            persons.on('remove', spy);

            Dispatcher.dispatch({
                eventName: actionNames.person.delete,
                model: persons.at(0)
            });

            expect(spy.lastCall.args[1].length).to.eql(2);

        });

        it("should not delete anything if payload.model does not exists in collection", () => {

            let persons = new PersonsCollection(testPersons);
            let spy = sinon.spy();

            let personToDelete = new Person(testPersonsAttrs[0]);

            persons.on('remove', spy);

            Dispatcher.dispatch({
                eventName: actionNames.person.delete,
                model: personToDelete
            });

            expect(spy.callCount).to.eql(0);
            expect(persons.length).to.eql(3);

        });

    });

});