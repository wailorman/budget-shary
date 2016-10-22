import {validationMiddleware} from './../validation-middleware'
import {CHANGE_PERSON, CHANGE_PRODUCT} from '../../actions'
import {normalizedBigFakeState} from '../../../test/fixtures/fake-state'
import {reducer} from '../../reducers/reducer'

describe("UNIT / Middlewares / validation middleware", ()=> {

    // Returns mutated action
    const callMiddleware = (action)=> {

        const next = (action)=> {
            return action;
        };

        const store = {
            getState(){
                return normalizedBigFakeState;
            }
        };

        return validationMiddleware(reducer)(store)(next)(action);

    };

    describe("CHANGE_PRODUCT", ()=> {
        
        it(`should not mutate action if all values are correct`, () => {

            const action = {
                type: CHANGE_PRODUCT,
                id: '1',
                values: {
                    name: 'Milk',
                    price: '50'
                }
            };

            const actual = callMiddleware(action);

            expect(actual).to.eql(action);
            
        });

        it(`should attach validation error to action`, () => {

            const action = {
                type: CHANGE_PRODUCT,
                id: '1',
                values: {
                    name: 'Milk',
                    price: '50b'
                }
            };

            const actual = callMiddleware(action);

            const expected = {
                type: CHANGE_PRODUCT,
                id: '1',
                values: {
                    name: 'Milk',
                    price: '50b'
                },
                meta: {
                    errors: {
                        products: {
                            1: {
                                price: ['Price is not a number']
                            }
                        }
                    }
                }
            };

            expect(actual).to.eql(expected);

        });
        
    });

    describe("CHANGE_PERSON", ()=> {

        it(`should not mutate action if all values are correct`, () => {

            const action = {
                type: CHANGE_PERSON,
                id: '1',
                values: {
                    name: 'Mike',
                    share: '50'
                }
            };

            const actual = callMiddleware(action);

            expect(actual).to.eql(action);

        });

        it(`should attach validation error to action`, () => {

            const action = {
                type: CHANGE_PERSON,
                id: '1',
                values: {
                    name: 'Mike',
                    share: '150'
                }
            };

            const actual = callMiddleware(action);

            const expected = {
                type: CHANGE_PERSON,
                id: '1',
                values: {
                    name: 'Mike',
                    share: '150'
                },
                meta: {
                    errors: {
                        persons: {
                            1: {
                                share: ['Share must satisfy expression 0 <= x <= 100']
                            }
                        }
                    }
                }
            };

            expect(actual).to.eql(expected);

        });

        it(`should attach shareSum errors if it was passed`, () => {

            const action = {
                type: CHANGE_PERSON,
                id: '1',
                values: {
                    name: 'Mike',
                    share: '150'
                },
                meta: {
                    newShareSum: '110'
                }
            };

            const actual = callMiddleware(action);

            const expected = {
                type: CHANGE_PERSON,
                id: '1',
                values: {
                    name: 'Mike',
                    share: '150'
                },
                meta: {
                    newShareSum: '110',
                    errors: {
                        persons: {
                            1: {
                                share: ['Share must satisfy expression 0 <= x <= 100']
                            }
                        },
                        common: {
                            shareSum: ['Share sum should be equal to 100, not 110']
                        }
                    }
                }
            };

            expect(actual).to.eql(expected);

        });

        it(`should not attach shareSum errors if it correct`, () => {

            const action = {
                type: CHANGE_PERSON,
                id: '1',
                values: {
                    name: 'Mike',
                    share: '150'
                },
                meta: {
                    newShareSum: '100'
                }
            };

            const actual = callMiddleware(action);

            const expected = {
                type: CHANGE_PERSON,
                id: '1',
                values: {
                    name: 'Mike',
                    share: '150'
                },
                meta: {
                    newShareSum: '100',
                    errors: {
                        persons: {
                            1: {
                                share: ['Share must satisfy expression 0 <= x <= 100']
                            }
                        }
                    }
                }
            };

            expect(actual).to.eql(expected);

        });

    });
    
});