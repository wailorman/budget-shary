"use strict";

import { errorsReducer, initialState } from '../reducer'

describe("UNIT / Reducers / errorsReducer", ()=> {

    it(`should return default errors state if no errors in action`, () => {

        const action = {
            type: 'CHANGE_PERSON',
            values: {
                name: 'Mi',
                share: '100'
            }
        };

        const actualState = errorsReducer({}, action);

        expect(actualState).to.eql(initialState.errors)

    });

    it(`should return attached to the action errors`, () => {

        const action = {
            type: 'CHANGE_PERSON',
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

        const actualState = errorsReducer({}, action);

        expect(actualState).to.eql(action.meta.errors);

    });

});