import {validationMiddleware} from '../../../src/middlewares/validation-middleware'
import {CHANGE_PERSON, CHANGE_PRODUCT} from '../../../src/actions'

describe("UNIT / Middlewares / validation middleware", ()=> {

    // Returns mutated action
    const callMiddleware = (action)=> {

        const next = (action)=> {
            return action;
        };

        return validationMiddleware()(next)(action);

    };

    describe("CHANGE_PRODUCT", ()=> {
        
        it(`should not mutate action if all values are correct`, () => {

            const action = {
                type: CHANGE_PRODUCT,
                id: '_1',
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
                id: '_1',
                values: {
                    name: 'Milk',
                    price: '50b'
                }
            };

            const actual = callMiddleware(action);

            const expected = {
                type: CHANGE_PRODUCT,
                id: '_1',
                values: {
                    name: 'Milk',
                    price: '50b'
                },
                meta: {
                    errors: {
                        products: {
                            _1: {
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
                id: '_1',
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
                id: '_1',
                values: {
                    name: 'Mike',
                    share: '150'
                }
            };

            const actual = callMiddleware(action);

            const expected = {
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

            expect(actual).to.eql(expected);

        });

    });
    
});