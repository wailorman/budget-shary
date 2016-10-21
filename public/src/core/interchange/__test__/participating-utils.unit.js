import {
    calculateMonetarySharesForProduct,
    getAmountOfProductParticipants,
    calculateMonetarySharesForProductsCollection,
    totalMonetarySharesByParticipating,
    monetarySharesToStateShares

} from './../interchange-utils'

import {
    fakeParticipatingState,
    participatingResult
} from './fake-interchange-state'

describe("UNIT / Core / Participating utils", ()=> {

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

    describe("#calculateMonetarySharesForProduct()", ()=> {

        const products = fakeParticipatingState.products;
        const participatingElements = fakeParticipatingState.productParticipating;

        const setup = (productId)=> {

            const participatingElem = participatingElements[productId];
            const price = products[productId].price;

            return {participatingElem, price};

        };

        it(`should calculate shares if we have 2 'true' participants`, () => {

            const {participatingElem, price} = setup(1);

            const expected = {
                1: 22.5,
                3: 22.5
            };

            const actual = calculateMonetarySharesForProduct(participatingElem, price);

            expect(actual).to.eql(expected);

        });

        it(`should calculate shares if we have 2 'true' participants and 1 'false'`, () => {

            const {participatingElem, price} = setup(8);

            const expected = {
                1: 117,
                2: 117
            };

            const actual = calculateMonetarySharesForProduct(participatingElem, price);

            expect(actual).to.eql(expected);

        });

        it(`should not calculate shares if we have 1 'false' participants`, () => {

            const {participatingElem, price} = setup(13);

            const expected = {};

            const actual = calculateMonetarySharesForProduct(participatingElem, price);

            expect(actual).to.eql(expected);

        });

        it(`should not calculate shares if we have 0 participants`, () => {

            const {participatingElem, price} = setup(14);

            const expected = {};

            const actual = calculateMonetarySharesForProduct(participatingElem, price);

            expect(actual).to.eql(expected);

        });

    });

    describe("#getAmountOfProductParticipants", ()=> {

        const participatingElements = fakeParticipatingState.productParticipating;

        it(`should return 3 if three participants == true`, () => {

            const participatingElement = participatingElements[11];

            const expected = 3;

            const actual = getAmountOfProductParticipants(participatingElement);

            expect(actual).to.eql(expected);

        });

        it(`should return 2 if two participants == true`, () => {

            const participatingElement = participatingElements[10];

            const expected = 2;

            const actual = getAmountOfProductParticipants(participatingElement);

            expect(actual).to.eql(expected);

        });

        it(`should return 2 if two participants == true and one of them == false`, () => {

            const participatingElement = participatingElements[8];

            const expected = 2;

            const actual = getAmountOfProductParticipants(participatingElement);

            expect(actual).to.eql(expected);

        });

        it(`should return 0 if one participant and he is == false`, () => {

            const participatingElement = participatingElements[13];

            const expected = 0;

            const actual = getAmountOfProductParticipants(participatingElement);

            expect(actual).to.eql(expected);

        });

        it(`should return 0 if no participants`, () => {

            const participatingElement = participatingElements[14];

            const expected = 0;

            const actual = getAmountOfProductParticipants(participatingElement);

            expect(actual).to.eql(expected);

        });

    });

    describe("#calculateMonetarySharesForProductsCollection", ()=> {

        it(`should calculate share for all product participant elements`, () => {

            const actual = calculateMonetarySharesForProductsCollection(
                fakeParticipatingState.productParticipating,
                fakeParticipatingState.products
            );

            const expectedFirstResult = {
                // Person#1 has $22.5 share in product#1 (first)
                "1": 22.5,
                // and person #3 has the same share in product#1
                "3": 22.5
            };

            // Product#14 (last) has no participants
            const expectedLastResult = {};

            expect(actual[1]).to.eql(expectedFirstResult);
            expect(actual[14]).to.eql(expectedLastResult);
            expect(_.keys(actual)).to.eql(_.keys(fakeParticipatingState.productParticipating));

        });

        it(`should log error participating elem if nonexistent product was participated`, () => {

            const fakeProductParticipating = _.chain(fakeParticipatingState.productParticipating)
                .cloneDeep()
                .merge({
                    100: {
                        2: true
                    }
                })
                .value();



            // Result of calculating monetary shares for each product participants
            // with nonexistent product
            const actualWithInvalidState = calculateMonetarySharesForProductsCollection(
                fakeProductParticipating,
                fakeParticipatingState.products
            );

            // and normal result, when products are exist
            const actualWithNormalState = calculateMonetarySharesForProductsCollection(
                fakeParticipatingState.productParticipating,
                fakeParticipatingState.products
            );

            expect(actualWithInvalidState).to.eql(actualWithNormalState);


            const matchRegex = /Error in calculating participating monetary share/i;
            const consoleExpectation = console.error.calledWithMatch(matchRegex);

            expect(consoleExpectation).to.eql(true);

        });

    });

    describe("#totalMonetarySharesByParticipating", ()=> {

        it(`should calculate total monetary shares
            for each person`, () => {

            const actual = totalMonetarySharesByParticipating(participatingResult);

            const expected = {
                "1": 903.5,
                "2": 1638,
                "3": 1332.5
            };

            expect(actual).to.eql(expected);

        });

    });

    describe("#monetarySharesToStateShares", ()=> {

        it(`should calculate partial shares by participating montary shares`, () => {

            const monetaryShares = {
                1: 500,
                2: 100,
                3: 400
            };

            const totalExpenses = 1000;

            const actual = monetarySharesToStateShares(monetaryShares, totalExpenses);

            const expected = {
                1: 50,
                2: 10,
                3: 40
            };


            expect(actual).to.eql(expected);

        });

    });

});