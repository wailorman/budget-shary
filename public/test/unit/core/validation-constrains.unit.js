import * as constrains from '../../../src/core/validation-constrains'

import { given } from 'mocha-testdata'

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

    describe("person", ()=> {

        const nameConstrains = constrains.person.name;

        describe("name", ()=> {

            it(`should accept normal name as string`, () => {

                const name = 'Jackie Chan';

                const actual = validate({ name }, {name: nameConstrains});

                const expected = undefined;

                expect(actual).to.eql(expected);

            });

            it(`should accept name as number`, () => {

                const name = 123;

                const actual = validate({ name }, {name: nameConstrains});

                const expected = undefined;

                expect(actual).to.eql(expected);

            });

            given(
                '',
                null,
                undefined
            ).it(`should not accept empty name`, () => {

                const name = '';

                const actual = validate({ name }, {name: nameConstrains});

                const expected = {
                    name: [
                        "Name can't be blank"
                    ]
                };

                expect(actual).to.eql(expected);

            });

        });

        const shareConstrains = constrains.person.share;

        describe("share", ()=> {

            it(`should accept share 10 as number`, () => {

                const share = 10;

                const actual = validate({ share }, {share: shareConstrains});

                const expected = undefined;

                expect(actual).to.eql(expected);

            });

            it(`should accept share 10 as string`, () => {

                const share = '10';

                const actual = validate({ share }, {share: shareConstrains});

                const expected = undefined;

                expect(actual).to.eql(expected);

            });

            it(`should accept share 10.5`, () => {

                const share = 10.5;

                const actual = validate({ share }, {share: shareConstrains});

                const expected = undefined;

                expect(actual).to.eql(expected);

            });

            it(`should accept share 0`, () => {

                const share = 0;

                const actual = validate({ share }, {share: shareConstrains});

                const expected = undefined;

                expect(actual).to.eql(expected);

            });

            it(`should not accept share -1`, () => {

                const share = -1;

                const actual = validate({ share }, {share: shareConstrains});

                const expected = {
                    share: [
                        "Share must satisfy expression 0 <= x <= 100"
                    ]
                };

                expect(actual).to.eql(expected);

            });

            it(`should not accept share > 100`, () => {

                const share = 101;

                const actual = validate({ share }, {share: shareConstrains});

                const expected = {
                    share: [
                        "Share must satisfy expression 0 <= x <= 100"
                    ]
                };

                expect(actual).to.eql(expected);

            });

            it(`should not accept empty share`, () => {

                const share = '';

                const actual = validate({ share }, {share: shareConstrains});

                const expected = {
                    share: [
                        "Share can't be blank"
                    ]
                };

                expect(actual).to.eql(expected);

            });

        });
        
    });
    
});