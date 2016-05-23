import * as constrains from '../../../src/core/validation-constrains'

const validate = require('validate.js');

// I think this is looks like integration test, not unit

describe("UNIT / Core / Validation Constrains", ()=> {

    describe("product", ()=> {

        describe(".name", ()=> {

            const nameConstrains = constrains.product.name;

            it(`should accept normal Name`, () => {

                const name = 'Jackie Chan';

                const actual = validate({ name }, {name: nameConstrains});
                
                const expected = undefined;
                
                expect(actual).to.eql(expected);
                
            });

            it(`should accept empty Name`, () => {

                const name = '';

                const actual = validate({ name }, {name: nameConstrains});

                const expected = undefined;

                expect(actual).to.eql(expected);

            });

            it(`should not accept object type`, () => {

                const name = true;

                const actual = validate({ name }, {name: nameConstrains});

                const expected = {
                    name: [
                        { notValid: "should be a string" }
                    ]
                };

                expect(actual).to.eql(expected);

            });

        });

        describe(".price", ()=> {

            const priceConstrains = constrains.product.price;

            it(`should accept Price 100`, () => {

                const price = 100;

                const actual = validate({ price }, {price: priceConstrains});

                const expected = undefined;

                expect(actual).to.eql(expected);

            });

            it(`should accept Price 11.2`, () => {

                const price = 11.2;

                const actual = validate({ price }, {price: priceConstrains});

                const expected = undefined;

                expect(actual).to.eql(expected);

            });

            it(`should accept Price 11.2 as string`, () => {

                const price = '11.2';

                const actual = validate({ price }, {price: priceConstrains});

                const expected = undefined;

                expect(actual).to.eql(expected);

            });

            it(`should accept Price 0`, () => {

                const price = 0;

                const actual = validate({ price }, {price: priceConstrains});

                const expected = undefined;

                expect(actual).to.eql(expected);

            });

            it(`should not accept Price -1`, () => {

                const price = -1;

                const actual = validate({ price }, {price: priceConstrains});

                const expected = {
                    price: [
                        "Price must be greater than or equal to 0"
                    ]
                };

                expect(actual).to.eql(expected);

            });

        });

    });

});