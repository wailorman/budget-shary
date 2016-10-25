import * as constrains from './../validation-constrains';

import { given } from 'mocha-testdata';

const validate = require('validate.js');

// I think this is looks like integration test, not unit

describe("UNIT / Core / Validation Constrains", ()=> {

    let sandbox;

    beforeEach(()=> {

        sandbox = sinon.sandbox.create();

        sandbox.stub(console, 'log');
        sandbox.stub(console, 'error');
        sandbox.stub(console, 'info');
        sandbox.stub(console, 'warn');
    });

    afterEach(()=> {
        sandbox.restore();
    });

    describe("id", ()=> {

        const idConstrains = constrains.id;

        it(`should accept object with id`, () => {

            const id = '123';

            const actual = validate(
                {id},
                {id: idConstrains}
            );

            const expected = undefined;

            expect(actual).to.eql(expected);

        });

        it(`should notify if object doesn't have id`, () => {

            // const id = '123';

            const actual = validate(
                {},
                {id: idConstrains}
            );

            const expected = {
                id: [`Id can't be blank`]
            };

            expect(actual).to.eql(expected);

        });

        it(`should not accept id as object`, () => {

            const id = {hey: 'ho'};

            const actual = validate(
                {id},
                {id: idConstrains}
            );

            const expected = {
                id: ["Id has an incorrect length"]
            };

            expect(actual).to.eql(expected);

        });

    });

    describe("product", ()=> {

        describe(".name", ()=> {

            const nameConstrains = constrains.product.name;

            it(`should accept normal Name`, () => {

                const name = 'Jackie Chan';

                const actual = validate({name}, {name: nameConstrains});
                
                const expected = undefined;
                
                expect(actual).to.eql(expected);
                
            });

            it(`should accept empty Name`, () => {

                const name = '';

                const actual = validate({name}, {name: nameConstrains});

                const expected = undefined;

                expect(actual).to.eql(expected);

            });

            it(`should not accept object type`, () => {

                const name = true;

                const actual = validate({name}, {name: nameConstrains});

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

                const actual = validate({price}, {price: priceConstrains});

                const expected = undefined;

                expect(actual).to.eql(expected);

            });

            it(`should accept Price 11.2`, () => {

                const price = 11.2;

                const actual = validate({price}, {price: priceConstrains});

                const expected = undefined;

                expect(actual).to.eql(expected);

            });

            it(`should accept Price 11.2 as string`, () => {

                const price = '11.2';

                const actual = validate({price}, {price: priceConstrains});

                const expected = undefined;

                expect(actual).to.eql(expected);

            });

            it(`should accept Price 0`, () => {

                const price = 0;

                const actual = validate({price}, {price: priceConstrains});

                const expected = undefined;

                expect(actual).to.eql(expected);

            });

            it(`should not accept Price -1`, () => {

                const price = -1;

                const actual = validate({price}, {price: priceConstrains});

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

        describe("name", ()=> {

            const nameConstrains = constrains.person.name;

            it(`should accept normal name as string`, () => {

                const name = 'Jackie Chan';

                const actual = validate({name}, {name: nameConstrains});

                const expected = undefined;

                expect(actual).to.eql(expected);

            });

            it(`should accept name as number`, () => {

                const name = 123;

                const actual = validate({name}, {name: nameConstrains});

                const expected = undefined;

                expect(actual).to.eql(expected);

            });

            given(
                '',
                null,
                undefined
            ).it(`should not accept empty name`, () => {

                const name = '';

                const actual = validate({name}, {name: nameConstrains});

                const expected = {
                    name: [
                        "Name can't be blank"
                    ]
                };

                expect(actual).to.eql(expected);

            });

        });

        describe("share", ()=> {

            const shareConstrains = constrains.person.share;

            it(`should accept share 10 as number`, () => {

                const share = 10;

                const actual = validate({share}, {share: shareConstrains});

                const expected = undefined;

                expect(actual).to.eql(expected);

            });

            it(`should accept share 10 as string`, () => {

                const share = '10';

                const actual = validate({share}, {share: shareConstrains});

                const expected = undefined;

                expect(actual).to.eql(expected);

            });

            it(`should accept share 10.5`, () => {

                const share = 10.5;

                const actual = validate({share}, {share: shareConstrains});

                const expected = undefined;

                expect(actual).to.eql(expected);

            });

            it(`should accept share 0`, () => {

                const share = 0;

                const actual = validate({share}, {share: shareConstrains});

                const expected = undefined;

                expect(actual).to.eql(expected);

            });

            it(`should not accept share -1`, () => {

                const share = -1;

                const actual = validate({share}, {share: shareConstrains});

                const expected = {
                    share: [
                        "Share must satisfy expression 0 <= x <= 100"
                    ]
                };

                expect(actual).to.eql(expected);

            });

            it(`should not accept share > 100`, () => {

                const share = 101;

                const actual = validate({share}, {share: shareConstrains});

                const expected = {
                    share: [
                        "Share must satisfy expression 0 <= x <= 100"
                    ]
                };

                expect(actual).to.eql(expected);

            });

            it(`should not accept empty share`, () => {

                const share = '';

                const actual = validate({share}, {share: shareConstrains});

                const expected = {
                    share: [
                        "Share can't be blank"
                    ]
                };

                expect(actual).to.eql(expected);

            });

        });
        
    });

    describe("common", ()=> {

        describe(".shareSum", ()=> {

            const shareSumConstrains = constrains.common.shareSum;

            it(`should accept empty shareSum`, () => {

                const shareSum = '';

                const actual = validate({ shareSum }, {shareSum: shareSumConstrains});

                const expected = undefined;

                expect(actual).to.eql(expected);

            });

            it(`should accept 100 share sum`, () => {

                const shareSum = 100;

                const actual = validate({ shareSum }, {shareSum: shareSumConstrains});

                const expected = undefined;

                expect(actual).to.eql(expected);
                
            });

            given(
                50,
                99.9,
                100.1,
                150
            ).it(`should not accept`, (shareSum) => {

                const actual = validate({ shareSum }, {shareSum: shareSumConstrains});

                const expected = {
                    shareSum: [
                        `Share sum should be equal to 100, not ${shareSum}`
                    ]
                };

                expect(actual).to.eql(expected);

            });
            
        });
        
    });
    
});