"use strict";

import {personsReducer} from '../personsReducer';

import {
    REMOVE_PERSON, NEW_PERSON, CHANGE_PERSON,
    FETCH_BUDGET,
    TOGGLE_PARTICIPATION
} from '../../actions';

import {
    normalizedFakeState,
    normalizedBigFakeState
} from '../../../test/fixtures/fake-state';

import {examplePersonsState} from './fixtures/persons-fixtures';
import {initialState} from '../initial-state';

const fakeInitialState = normalizedFakeState;

describe("UNIT / Reducers / personsReducer", () => {

    const fakeInitialStatePersons = fakeInitialState.persons;

    it(`should return default initial state if no args`, () => {

        const actual = personsReducer();

        expect(actual).to.eql(initialState.persons);

    });

    it(`should return exactly default initial state`, () => {

        const actual = personsReducer();

        expect(actual === initialState.persons).to.eql(true);

    });

    describe("FETCH_BUDGET", () => {

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

    describe("REMOVE_PERSON", () => {

        it(`should remove existing person from the state`, () => {

            const action = {
                type: REMOVE_PERSON,
                id: 1
            };

            const actual = personsReducer(examplePersonsState, action);

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

            const actual = personsReducer(examplePersonsState, action);

            expect(actual === examplePersonsState).to.eql(true);

        });

        it(`should leave state alone if person id == null`, () => {

            const action = {
                type: REMOVE_PERSON,
                id: null
            };

            const actual = personsReducer(examplePersonsState, action);

            expect(actual === examplePersonsState).to.eql(true);

        });

    });

    describe("NEW_PERSON", () => {

        it(`should add new empty person`, () => {

            const action = {
                type: NEW_PERSON
            };

            const actual = personsReducer(fakeInitialStatePersons, action);
            const newPersonId = _.last(_.keys(actual));
            const newPerson = actual[newPersonId];

            expect(_.keys(actual).length).to.eql(_.keys(fakeInitialStatePersons).length + 1);
            expect(newPerson.id).to.match(/\d/);
            expect(newPerson.name).to.eql('');
            expect(newPerson.share).to.eql('');

        });

        it(`should add another empty person`, () => {

            const action = {
                type: NEW_PERSON
            };

            const firstCall = personsReducer(fakeInitialStatePersons, action);
            const actual = personsReducer(firstCall, action);

            expect(_.keys(actual).length).to.eql(_.keys(fakeInitialStatePersons).length + 2);

        });

    });

    describe("CHANGE_PERSON", () => {

        it(`should change person fields`, () => {

            const action = {
                type: CHANGE_PERSON,
                id: '1',
                values: {
                    name: 'Clean water',
                    share: '50'
                }
            };

            const result = personsReducer(examplePersonsState, action);

            const changedPerson = result['1'];

            expect(changedPerson.name).to.eql('Clean water');
            expect(changedPerson.share).to.eql('50');

        });

        // todo: Let's create a new person
        it(`should not do anything if person doesn't exist`, () => {

            const action = {
                type: CHANGE_PERSON,
                id: '201',
                values: {
                    name: 'Clean water',
                    share: '50'
                }
            };

            const result = personsReducer(examplePersonsState, action);

            expect(result === examplePersonsState).to.eql(true);

        });

        it(`should return the same state if we pass old values`, () => {

            const action = {
                type: CHANGE_PERSON,
                id: '1',
                values: {
                    ...examplePersonsState['1']
                }
            };

            const result = personsReducer(examplePersonsState, action);

            expect(result).to.eql(examplePersonsState);
            expect(result === examplePersonsState).to.eql(true);

        });

        it(`should not remove fields we didn't pass one of them to action`, () => {

            const action = {
                type: CHANGE_PERSON,
                id: '1',
                values: {
                    name: 'Clean water'
                }
            };

            const result = personsReducer(examplePersonsState, action);

            const changedPerson = result['1'];

            expect(changedPerson.name).to.eql('Clean water');
            expect(changedPerson.share).to.eql(examplePersonsState['1'].share);

        });

    });

    describe("TOGGLE_PARTICIPATION", () => {

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

        it(`should ignore nonexistent persons`, () => {

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
                }
            };

            const actualState = personsReducer(initialState, action);

            expect(actualState).to.eql(expectedState);

        });

        it(`should return exactly the same state if no .meta.newPersonShares`, () => {

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
                personId: '1'
            };

            const actualState = personsReducer(initialState, action);

            expect(actualState === initialState).to.eql(true);

        });

        it(`should return exactly the same state if no .productId or .personId`, () => {

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

            const actionNoProduct = {
                type: TOGGLE_PARTICIPATION,
                personId: '1',
                meta: {
                    newPersonShares: {
                        1: 20,
                        2: 30,
                        3: 50
                    }
                }
            };

            const actionNoPerson = {
                type: TOGGLE_PARTICIPATION,
                productId: '1',
                meta: {
                    newPersonShares: {
                        1: 20,
                        2: 30,
                        3: 50
                    }
                }
            };

            const actualStateNoProduct = personsReducer(initialState, actionNoProduct);
            const actualStateNoPerson = personsReducer(initialState, actionNoPerson);

            expect(actualStateNoProduct === initialState).to.eql(true);
            expect(actualStateNoPerson === initialState).to.eql(true);

        });

    });

});