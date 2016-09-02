"use strict";

import { errorsReducer } from '../../../src/reducer'
import {
    DISPLAY_INTERCHANGE_ERROR,
    REMOVE_INTERCHANGE_ERRORS,
    PUT_PERSONS_ERRORS,
    PUT_VALIDATION_ERRORS,

    CHANGE_PERSON, CHANGE_PRODUCT
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

    describe("PUT_VALIDATION_ERRORS", ()=> {

        it(`should put first validation error`, () => {

            const validationErrors = {
                persons: [
                    undefined,
                    {
                        name: ['Some err']
                    }
                ]
            };

            const action = {
                type: PUT_VALIDATION_ERRORS,
                errors: validationErrors
            };

            const actual = errorsReducer({}, action);

            const expected = {
                persons: [
                    undefined,
                    {
                        name: ['Some err']
                    }
                ]
            };

            expect(actual).to.eql(expected);

        });

        it(`should remove old validation errors`, () => {

            const previousState = {
                products: [
                    undefined,
                    {
                        price: ['Should be greater than -1']
                    }
                ]
            };

            const validationErrors = {
                persons: [
                    undefined,
                    {
                        name: ['Some err']
                    }
                ]
            };

            const action = {
                type: PUT_VALIDATION_ERRORS,
                errors: validationErrors
            };

            const actual = errorsReducer(previousState, action);

            const expected = {
                persons: [
                    undefined,
                    {
                        name: ['Some err']
                    }
                ]
            };

            expect(actual).to.eql(expected);

        });

    });

    describe("CHANGE_PERSON", ()=> {

        const actionWithErrors = {
            type: CHANGE_PERSON,
            id: '_1',
            values: {
                name: 'Mike',
                share: '150'
            },
            meta: {
                errors: {
                    persons: {
                        _1: {
                            share: ['Share must satisfy expression 0 <= x <= 100']
                        }
                    }
                }
            }
        };

        const cleanAction = {
            type: CHANGE_PERSON,
            id: '_1',
            values: {
                name: 'Mike',
                share: '150'
            }
        };

        it(`should not add any errors if no errors in action`, () => {

            const actual = errorsReducer({}, cleanAction);

            const expected = {};

            expect(actual).to.eql(expected);

        });

        it(`should add errors if it was passed in action`, () => {

            const actual = errorsReducer({}, actionWithErrors);

            const expected = {
                persons: {
                    _1: {
                        share: ['Share must satisfy expression 0 <= x <= 100']
                    }
                }
            };

            expect(actual).to.eql(expected);

        });

        it(`should merge with existing person's errors`, () => {

            const existingErrors = {
                persons: {
                    _2: {
                        name: ['Bad name!']
                    }
                }
            };

            const actual = errorsReducer(existingErrors, actionWithErrors);

            const expected = {
                persons: {
                    _1: {
                        share: ['Share must satisfy expression 0 <= x <= 100']
                    },
                    _2: {
                        name: ['Bad name!']
                    }
                }
            };

            expect(actual).to.eql(expected);

        });

        it(`should remove old person's errors if action has no errors`, () => {

            const existingErrors = {
                persons: {
                    _1: {
                        share: ['share must satisfy expression 0 <= x <= 100']
                    }
                }
            };

            const actual = errorsReducer(existingErrors, cleanAction);

            const expected = {
                persons: {}
            };

            expect(actual).to.eql(expected);

        });

        it(`should not touch other person's errors`, () => {

            const existingErrors = {
                persons: {
                    _2: {
                        share: ['share must satisfy expression 0 <= x <= 100']
                    }
                }
            };

            const actual = errorsReducer(existingErrors, cleanAction);

            const expected = {
                persons: {
                    _2: {
                        share: ['share must satisfy expression 0 <= x <= 100']
                    }
                }
            };

            // debugger;

            expect(actual).to.eql(expected);

        });

    });

    describe("CHANGE_PRODUCT", ()=> {

        const actionWithErrors = {
            type: CHANGE_PRODUCT,
            id: '_1',
            values: {
                name: 'Mike',
                price: '150'
            },
            meta: {
                errors: {
                    products: {
                        _1: {
                            price: ['Price must satisfy expression 0 <= x <= 100']
                        }
                    }
                }
            }
        };

        const cleanAction = {
            type: CHANGE_PRODUCT,
            id: '_1',
            values: {
                name: 'Mike',
                price: '150'
            }
        };

        it(`should not add any errors if no errors in action`, () => {

            const actual = errorsReducer({}, cleanAction);

            const expected = {};

            expect(actual).to.eql(expected);

        });

        it(`should add errors if it was passed in action`, () => {

            const actual = errorsReducer({}, actionWithErrors);

            const expected = {
                products: {
                    _1: {
                        price: ['Price must satisfy expression 0 <= x <= 100']
                    }
                }
            };

            expect(actual).to.eql(expected);

        });

        it(`should merge with existing product's errors`, () => {

            const existingErrors = {
                products: {
                    _2: {
                        name: ['Bad name!']
                    }
                }
            };

            const actual = errorsReducer(existingErrors, actionWithErrors);

            const expected = {
                products: {
                    _1: {
                        price: ['Price must satisfy expression 0 <= x <= 100']
                    },
                    _2: {
                        name: ['Bad name!']
                    }
                }
            };

            expect(actual).to.eql(expected);

        });
        
        it(`should remove old product's errors if action has no errors`, () => {

            const existingErrors = {
                products: {
                    _1: {
                        price: ['Price must satisfy expression 0 <= x <= 100']
                    }
                }
            };

            const actual = errorsReducer(existingErrors, cleanAction);

            const expected = {
                products: {}
            };

            expect(actual).to.eql(expected);

        });

        it(`should not touch other product's errors`, () => {

            const existingErrors = {
                products: {
                    _2: {
                        price: ['Price must satisfy expression 0 <= x <= 100']
                    }
                }
            };

            const actual = errorsReducer(existingErrors, cleanAction);

            const expected = {
                products: {
                    _2: {
                        price: ['Price must satisfy expression 0 <= x <= 100']
                    }
                }
            };

            // debugger;

            expect(actual).to.eql(expected);

        });

    });

});