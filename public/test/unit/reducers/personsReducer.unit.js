"use strict";

import { personsReducer } from '../../../src/reducer'
import {
    REMOVE_PERSON, NEW_PERSON, CHANGE_PERSON
} from '../../../src/actions'
import { normalizedFakeState } from '../../fixtures/fake-state'

const initialState = normalizedFakeState;


describe("UNIT / Reducers / personsReducer", ()=> {

    const initialStatePersons = initialState.persons;

    describe("REMOVE_PERSON", ()=> {

        it(`should remove existing person from the state`, () => {

            const action = {
                type: REMOVE_PERSON,
                id: 1
            };

            const actual = personsReducer(initialStatePersons, action);

            const expected = {
                2: {id: '2', name: 'Jack', share: '60'}
            };

            expect(actual).to.eql(expected);

        });

        it(`should leave state alone if person doesn't exist`, () => {

            const action = {
                type: REMOVE_PERSON,
                id: 3
            };

            const actual = personsReducer(initialStatePersons, action);

            expect(actual).to.eql(initialStatePersons);

        });

        it(`should leave state alone if person id == null`, () => {

            const action = {
                type: REMOVE_PERSON,
                id: null
            };

            const actual = personsReducer(initialStatePersons, action);

            expect(actual).to.eql(initialStatePersons);

        });

    });

    describe("NEW_PERSON", ()=> {

        it(`should add new empty person`, () => {

            const action = {
                type: NEW_PERSON
            };

            const actual = personsReducer(initialStatePersons, action);
            const newPersonId = _.last(_.keys(actual));
            const newPerson = actual[newPersonId];

            expect(_.keys(actual).length).to.eql(_.keys(initialStatePersons).length + 1);
            expect(newPerson.id).to.match(/\d/);
            expect(newPerson.name).to.eql('');
            expect(newPerson.share).to.eql('');

        });

        it(`should add another empty person`, () => {

            const action = {
                type: NEW_PERSON
            };

            const firstCall = personsReducer(initialStatePersons, action);
            const actual = personsReducer(firstCall, action);

            expect(_.keys(actual).length).to.eql(_.keys(initialStatePersons).length + 2);

        });

    });

    describe("CHANGE_PERSON", ()=> {

        it(`should change person fields`, () => {

            const action = {
                type: CHANGE_PERSON,
                id: '1',
                values: {
                    name: 'Clean water',
                    share: '50'
                }
            };

            const result = personsReducer(initialStatePersons, action);

            const changedPerson = result['1'];

            expect(changedPerson.name).to.eql('Clean water');
            expect(changedPerson.share).to.eql('50');

        });

        it(`should not do anything if person doesn't exist`, () => {

            const action = {
                type: CHANGE_PERSON,
                id: '201',
                values: {
                    name: 'Clean water',
                    share: '50'
                }
            };

            const result = personsReducer(initialStatePersons, action);

            expect(result).to.eql(initialStatePersons)

        });

        it(`should return the same person if we pass old values`, () => {

            const action = {
                type: CHANGE_PERSON,
                id: '1',
                values: {
                    name: 'Mike',
                    share: '40'
                }
            };

            const result = personsReducer(initialStatePersons, action);

            const changedPerson = result['1'];

            expect(changedPerson.name).to.eql('Mike');
            expect(changedPerson.share).to.eql('40');

        });

        it(`should not remove fields we didn't pass to action`, () => {

            const action = {
                type: CHANGE_PERSON,
                id: '1',
                values: {
                    name: 'Clean water'
                }
            };

            const result = personsReducer(initialStatePersons, action);

            const changedPerson = result['1'];

            expect(changedPerson.name).to.eql('Clean water');
            expect(changedPerson.share).to.eql('40');

        });

    });

});