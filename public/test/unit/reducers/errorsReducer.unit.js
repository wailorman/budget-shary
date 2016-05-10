"use strict";

import { errorsReducer } from '../../../src/reducer'
import { DISPLAY_INTERCHANGE_ERROR, REMOVE_INTERCHANGE_ERRORS } from '../../../src/actions'

import { fakeState } from '../../fixtures/fake-state'
const initialErrorsState = fakeState.errors;

describe("UNIT / Reducers / errorsReducer", ()=> {

    it(`should return [] as initial state`, () => {

        const expected = {};

        const actual = errorsReducer(undefined, {});

        expect(actual).to.eql(expected);

    });

    describe("DISPLAY_INTERCHANGE_ERROR", ()=> {

        it(`should return state like {interchange: [...]}`, () => {

            const action = {
                type: DISPLAY_INTERCHANGE_ERROR,
                error: new Error('Some interchange error')
            };

            const expected = {interchange: [new Error('Some interchange error')]};

            const actual = errorsReducer(initialErrorsState, action);

            expect(actual).to.eql(expected);

        });

        it(`should remove old error and place a new one`, () => {

            const action = {
                type: DISPLAY_INTERCHANGE_ERROR,
                error: new Error('Another interchange error')
            };

            const expected = {interchange: [new Error('Another interchange error')]};

            const actual = errorsReducer(initialErrorsState, action);

            expect(actual).to.eql(expected);

        });

    });

    describe("REMOVE_INTERCHANGE_ERRORS", ()=> {

        it(`should remove all interchange errors`, () => {

            const action = {
                type: REMOVE_INTERCHANGE_ERRORS
            };

            const expected = {interchange: []};

            const actual = errorsReducer(initialErrorsState, action);

            expect(actual).to.eql(expected);

        });

    });

});