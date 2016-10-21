"use strict";

import { personsReducer } from '../reducer'
import {
    REMOVE_PERSON, NEW_PERSON, CHANGE_PERSON,
    FETCH_BUDGET,
    TOGGLE_PARTICIPATION
} from '../../actions'
import { normalizedFakeState, normalizedBigFakeState } from '../../../test/fixtures/fake-state'

const initialState = normalizedFakeState;


describe("UNIT / Reducers / personsReducer", ()=> {

    const initialStatePersons = initialState.persons;

    describe("FETCH_BUDGET", ()=> {

        it(`should return clean state if .result wasn't attached to action`, () => {

            const action = {
                type: FETCH_BUDGET,
                id: 'budget1'
            };

            const expected = {};

            const actual = personsReducer({}, action);

            expect(actual).to.eql(expected);

        });

        it(`should return persons if .result is attached`, () => {

            const action = {
                type: FETCH_BUDGET,
                id: 'budget1',
                result: normalizedBigFakeState
            };

            const expected = normalizedBigFakeState.persons;

            const actual = personsReducer({}, action);

            expect(actual).to.eql(expected);

        });

        it(`should clean previous state if .result wasn't attached`, () => {

            const action = {
                type: FETCH_BUDGET,
                id: 'budget1'
            };

            const expected = {};

            const actual = personsReducer(normalizedBigFakeState.persons, action);

            expect(actual).to.eql(expected);

        });

    });

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

    describe("TOGGLE_PARTICIPATION", ()=> {

        it(`should change persons shares`, () => {

            const initialState = {
                1: {
                    id: 1,
                    name: 'Mike',
                    share: 10
                },
                2: {
                    id: 2,
                    name: 'Alice',
                    share: 20
                },
                3: {
                    id: 3,
                    name: 'Jimmy',
                    share: 70
                }
            };

            const action = {
                type: TOGGLE_PARTICIPATION,
                productId: '1',
                personId: '1',
                meta: {
                    newPersonShares: {
                        1: 20,
                        2: 30,
                        3: 50
                    }
                }
            };

            const expectedState = {
                1: {
                    id: 1,
                    name: 'Mike',
                    share: 20
                },
                2: {
                    id: 2,
                    name: 'Alice',
                    share: 30
                },
                3: {
                    id: 3,
                    name: 'Jimmy',
                    share: 50
                }
            };

            const actualState = personsReducer(initialState, action);
            
            expect(actualState).to.eql(expectedState);

        });

    });
    
});