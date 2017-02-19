import {personsReducer} from '../personsReducer';
import { OrderedMap, Map } from 'immutable';
import sinonSandbox from '../../../test/helpers/sinon-sandbox';
import * as reducerUtils from '../../utils/reducer-utils';

const { expect, assert } = require('chai');

import {
    REMOVE_PERSON, NEW_PERSON, CHANGE_PERSON,
    FETCH_BUDGET,
    TOGGLE_PARTICIPATION
} from '../../actions';

import {initialState} from '../initial-state';

const exampleObj = {
    '1': {id: '1', name: 'Mike', share: '40'},
    '2': {id: '2', name: 'Jack', share: '60'}
};

const exampleMap = OrderedMap({
    '1': Map({id: '1', name: 'Mike', share: '40'}),
    '2': Map({id: '2', name: 'Jack', share: '60'})
});


describe("UNIT / Reducers / personsReducer", () => {

    let sandbox;

    sinonSandbox((sinon) => {
        sandbox = sinon;
    });

    it(`should return default initial state if no args`, () => {

        const actual = personsReducer();

        expect(actual).to.eql(initialState.persons);

    });

    it(`should return exactly default initial state`, () => {

        const actual = personsReducer();

        expect(actual === initialState.persons).to.eql(true);

    });

    describe("FETCH_BUDGET", () => {

        it(`should call reducer utils method`, () => {

            const spy = sandbox.spy(reducerUtils, "fetch");

            const action = {
                type: FETCH_BUDGET,
                id: 'budget1',
                result: { persons: exampleObj }
            };

            personsReducer(exampleMap, action);

            assert.ok(spy.calledOnce, "wasn't called");
            assert.ok(spy.calledWithExactly('result.persons', exampleMap, action));

        });

    });

    describe("REMOVE_PERSON", () => {

        it(`should call reducer utils method`, () => {

            const spy = sandbox.spy(reducerUtils, "remove");

            const action = {
                type: REMOVE_PERSON,
                id: '1'
            };

            personsReducer(exampleMap, action);

            assert.ok( spy.calledOnce );
            assert.ok( spy.calledWithExactly(exampleMap, action) );

        });

        it(`should remove person`, () => {

            const action = {
                type: REMOVE_PERSON,
                id: '1'
            };

            const result = personsReducer(exampleMap, action);

            assert.isUndefined(result.get('1'));
            assert.equal(result.size, exampleMap.size - 1);

        });

    });

    describe("NEW_PERSON", () => {

        it(`should call reducer utils method`, () => {

            const spy = sandbox.spy(reducerUtils, "add");

            const action = {
                type: NEW_PERSON,
                id: '100'
            };

            personsReducer(exampleMap, action);

            assert.ok( spy.calledOnce, "wasn't called" );
            assert.ok( spy.calledWithExactly(exampleMap, action), "wrong arguments" );

        });

        it(`should create person w/ right attrs`, () => {

            const action = {
                type: NEW_PERSON,
                id: '100',
                values: {
                    name: '',
                    share: ''
                }
            };

            const result = personsReducer(exampleMap, action).get('100');

            assert.deepEqual( result.get('name'), '' );
            assert.deepEqual( result.get('share'), '' );

        });

    });

    describe("CHANGE_PERSON", () => {

        it(`should call reducer utils method`, () => {

            const spy = sandbox.spy(reducerUtils, "update");

            const action = {
                type: CHANGE_PERSON,
                id: '1',
                values: {
                    name: 'Clean water',
                    share: '50'
                }
            };

            personsReducer(exampleMap, action);

            assert.ok( spy.calledOnce, "wasn't called" );
            assert.ok( spy.calledWithExactly(exampleMap, action), "wrong arguments" );

        });

        it(`should change person fields`, () => {

            const action = {
                type: CHANGE_PERSON,
                id: '1',
                values: {
                    name: 'Clean water',
                    share: '50'
                }
            };

            const result = personsReducer(exampleMap, action).get('1');

            assert.equal(
                result.get('name'),
                'Clean water'
            );

            assert.equal(
                result.get('share'),
                '50'
            );

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