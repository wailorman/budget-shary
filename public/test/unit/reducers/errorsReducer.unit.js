"use strict";

import { errorsReducer } from '../../../src/reducer'
import {
    DISPLAY_INTERCHANGE_ERROR,
    REMOVE_INTERCHANGE_ERRORS,
    PUT_PERSONS_ERRORS
} from '../../../src/actions'

import { fakeState } from '../../fixtures/fake-state'
const initialErrorsState = fakeState.errors;

describe("UNIT / Reducers / errorsReducer", ()=> {

    it(`should return [] as initial state`, () => {

        const expected = {};

        const actual = errorsReducer(undefined, {});

        expect(actual).to.eql(expected);

    });

    describe("PUT_PERSONS_ERRORS", ()=> {

        const personsErrors = {
            id: ['ID missing'],
            name: ['Name is invalid'],
            share: [
                'Share should be between 0..100',
                'Share should contain only digits and dots'
            ]
        };

        it(`should set persons errors`, () => {

            const action = {
                type: PUT_PERSONS_ERRORS,
                errors: personsErrors
            };

            const actual = errorsReducer(initialErrorsState, action);

            expect(actual.persons).to.eql(personsErrors);

        });

        it(`should substitute old persons errors with new one`, () => {

            const personsErrors = {
                id: ['ID missing'],
                name: ['Name is invalid'],
                share: [
                    'Share should be between 0..100',
                    'Share should contain only digits and dots'
                ]
            };

            const stateWithPersonsErrorsAlready = {
                id: ['ID missing'],
                name: ['Name is invalid', 'Some...']
            };

            const action = {
                type: PUT_PERSONS_ERRORS,
                errors: personsErrors
            };

            const actual = errorsReducer(stateWithPersonsErrorsAlready, action);

            expect(actual.persons).to.eql(personsErrors);

        });

    });

});