import { errorsReducer } from '../errorsReducer';
import {initialState} from '../initial-state';
import { Map, List } from 'immutable';

const exampleMap = Map({
    person: List(['Wrong!'])
});

describe("UNIT / Reducers / errorsReducer", ()=> {

    it(`should return default errors state if no errors in action`, () => {

        const action = {};

        assert(
            errorsReducer(initialState.errors, action)
                .equals(initialState.errors)
        );

    });

    it(`should return attached to the action errors`, () => {

        const action = {
            values: {
                name: 'Mi',
                share: '100'
            },
            meta: {
                errors: {
                    common: ['Share share share!']
                }
            }
        };

        const result = errorsReducer({}, action);

        assert.equal(result.size, 1);
        assert.ok(result.get('common'));
        assert.equal(result.get('common'), List(['Share share share!']));

    });

    it(`should substitute previous errors`, () => {

        const action = {
            values: {
                name: 'Mi',
                share: '100'
            },
            meta: {
                errors: {
                    common: ['Share share share!']
                }
            }
        };

        const result = errorsReducer(exampleMap, action);

        assert.equal(result.size, 1);
        assert.ok(result.get('common'));
        assert.equal(result.get('common'), List(['Share share share!']));

    });
    
    it(`should not mutate repeating errors`, () => {

        const action = {
            values: {
                name: 'Mi',
                share: '100'
            },
            meta: {
                errors: {
                    common: ['Share share share!'],
                    person: ['Wrong!']
                }
            }
        };

        const result = errorsReducer(exampleMap, action);

        assert.ok(
            exampleMap.get('person')
                .equals(result.get('person'))
        );

    });

});