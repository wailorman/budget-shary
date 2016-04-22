import {
    totalExpenses,
    ownExpenses,
    shareInMonetary,
    createTransaction,
    tryTransaction,
    transactionsTotal, INCOME, OUTCOME,
    getFunds,
    splitToNegativeAndPositive,
    proceedInterchange
} from '../../../src/core/utils'

import {
    fakeState,
    fakeStateCase1,
    fakeStateCase1WithTransactions
} from '../../fixtures/fake-state'

import { given } from 'mocha-testdata';

describe("UNIT / Core / Utils", ()=> {

    describe("totalExpenses", ()=> {

        it(`should calculate expenses of all persons`, () => {

            expect(totalExpenses(fakeState)).to.eql(100);

        });

    });

    describe("ownExpenses", ()=> {

        it(`should calculate expenses for specific person`, () => {

            expect(ownExpenses(fakeState, '1')).to.eql(40);

        });

    });

    describe("shareInMonetary", ()=> {

        it(`should return share in monetary equivalent`, () => {

            expect(shareInMonetary(fakeState, '1')).to.eql(40);

        });

    });

    describe("createTransaction", ()=> {

        it(`should create simple transaction`, () => {

            const resultState = createTransaction(fakeState, '1', '2', 200);

            expect(resultState.transactions.length).to.eql(1);
            expect(resultState.transactions[0]).to.eql({from: '1', to: '2', total: 200});

        });

        it(`should not create transaction if one of members don't exist`, () => {

            const tryToCall_from = createTransaction.bind(null, fakeState, '1', '3', 200);

            expect(tryToCall_from).to.throw(/3 doesn't exist/);

            /////////////////////////

            const tryToCall_to = createTransaction.bind(null, fakeState, '0', '2', 200);

            expect(tryToCall_to).to.throw(/0 doesn't exist/);

        });

        it(`should not create transact w/ negative total`, () => {

            const tryToCall_negative = createTransaction.bind(null, fakeState, '1', '2', -1);

            expect(tryToCall_negative).to.throw(/can't/i);
            expect(tryToCall_negative).to.throw(/negative/);

        });

        it(`should not create transactions with total == 0`, () => {

            const resultState = createTransaction(fakeState, '1', '2', 0);

            expect(resultState).to.eql(fakeState);

        });

    });

    describe("tryTransaction", ()=> {

        let sandbox;

        beforeEach(()=> {

            sandbox = sinon.sandbox.create();

            sandbox.stub(console, 'log');
            sandbox.stub(console, 'error');
        });

        afterEach(()=> {
            sandbox.restore();
        });


        given(
            [100, 100, 0],
            [100, -100, 100],
            [100, -200, 100],
            [100, -50, 50],
            [0, 0, 0]
        ).it(`should return possible transaction `, (positiveFunds, negativeFunds, expectedResult) => {

            expect(tryTransaction(positiveFunds, negativeFunds)).to.eql(expectedResult);

        });

        it(`should log error and return 0 if (-100, 0)`, () => {

            expect(tryTransaction(-100, 0)).to.eql(0);
            expect(console.error.called).to.eql(true);
            expect(console.error.lastCall.args[0].toString()).to.match(/can't be negative/);

        });

        it(`should log error and return 0 if (0, 100)`, () => {

            expect(tryTransaction(0, 100)).to.eql(0);
            expect(console.error.called).to.eql(true);
            expect(console.error.lastCall.args[0].toString()).to.match(/can't be positive/);

        });

        it(`should return 0 if at least 1 member have 0 funds`, () => {

            expect(tryTransaction(0, -100)).to.eql(0);
            expect(tryTransaction(100, 0)).to.eql(0);

        });

    });

    describe("transactionsTotal", ()=> {

        const state = {
            transactions: [
                {from: '2', to: '1', total: 50}, // 1
                {from: '1', to: '2', total: 40}, // 2
                {from: '2', to: '1', total: 100}, // 3
                {from: '2', to: '1', total: 200}, // 4
                {from: '1', to: '2', total: 10}, // 5
                {from: '2', to: '1', total: 60}, // 6
                {from: '2', to: '1', total: 50}, // 7
                {from: '1', to: '2', total: 70}, // 8
                {from: '1', to: '2', total: 80}  // 9
            ]
        };

        it(`should calculate 1's income`, () => {

            expect(transactionsTotal(state, INCOME, '1')).to.eql(460);

        });

        it(`should calculate 1's outcome`, () => {

            expect(transactionsTotal(state, OUTCOME, '1')).to.eql(200);

        });

        it(`should calculate 2's income`, () => {

            expect(transactionsTotal(state, INCOME, '2')).to.eql(200);

        });

        it(`should calculate 2's outcome`, () => {

            expect(transactionsTotal(state, OUTCOME, '2')).to.eql(460);

        });

        it(`should throw error if direction is incorrect`, () => {

            expect(transactionsTotal.bind(null, state, '_', '2')).to.throw(/direction/);

        });


        it(`should not throw err if no transactions`, () => {

            expect(transactionsTotal.bind(null, fakeStateCase1, '3')).to.not.throw(TypeError);

        });


        it(`should return 0 if no transactions`, () => {

            expect(transactionsTotal(fakeStateCase1, INCOME, '3')).to.eql(0);
            expect(transactionsTotal(fakeStateCase1, OUTCOME, '3')).to.eql(0);

        });

    });

    describe("getFunds", ()=> {

        describe("w/out transactions", ()=> {

            it(`should calculate Jack's funds`, () => {
                const calculatedFunds = getFunds(fakeStateCase1, '1');
                const expectedRange = [1755, 1756];

                expect(calculatedFunds).to.be.within(expectedRange[0], expectedRange[1]);
            });

            it(`should calculate Alice's funds`, () => {
                const calculatedFunds = getFunds(fakeStateCase1, '2');
                const expectedRange = [-612, -611];

                expect(calculatedFunds).to.be.within(expectedRange[0], expectedRange[1]);
            });

            it(`should calculate Mike's funds`, () => {
                const calculatedFunds = getFunds(fakeStateCase1, '3');
                const expectedRange = [-1145, -1144];

                expect(calculatedFunds).to.be.within(expectedRange[0], expectedRange[1]);
            });

        });

        describe("w/ transactions", ()=> {

            it(`Jack funds == 0`, () => {
                const calculatedFunds = getFunds(fakeStateCase1WithTransactions, '1');
                const roundedFunds = Math.abs(_.round(calculatedFunds));

                expect(roundedFunds).to.eql(0);
            });

            it(`Alice funds == 0`, () => {
                const calculatedFunds = getFunds(fakeStateCase1WithTransactions, '2');
                const roundedFunds = Math.abs(_.round(calculatedFunds));

                expect(roundedFunds).to.eql(0);
            });

            it(`Mike funds == 0`, () => {
                const calculatedFunds = getFunds(fakeStateCase1WithTransactions, '3');
                const roundedFunds = Math.abs(_.round(calculatedFunds));

                expect(roundedFunds).to.eql(0);
            });

        });

    });

    describe("splitToNegativeAndPositive", ()=> {

        let sandbox;

        beforeEach(()=> {

            sandbox = sinon.sandbox.create();
        });

        afterEach(()=> {
            sandbox.restore();
        });

        it(`Jack should be in positive group`, () => {

            const result = splitToNegativeAndPositive(fakeStateCase1);

            expect(result.positive).to.eql(['1']);

        });

        it(`Alice and Mike should be in negative group`, () => {

            const result = splitToNegativeAndPositive(fakeStateCase1);

            expect(result.negative).to.eql(['2', '3']);

        });

        it(`should not involve members w/ funds == 0`, () => {

            const state = {
                persons: [
                    {id: '1', name: '', share: '25'},
                    {id: '2', name: '', share: '25'},
                    {id: '3', name: '', share: '25'},
                    {id: '4', name: '', share: '25'}
                ]
            };

            let getFunds = sinon.stub();
            getFunds.withArgs(state, '1').returns(0);
            getFunds.withArgs(state, '2').returns(20);
            getFunds.withArgs(state, '3').returns(-10);
            getFunds.withArgs(state, '4').returns(-10);

            const expected = {
                positive: [ '2' ],
                negative: [ '3', '4' ]
            };

            const splittingResult = splitToNegativeAndPositive(state, {getFunds});

            assert.equal(
                getFunds.callCount, 4, `getFunds stub didn't called correctly`);

            expect(splittingResult).to.eql(expected);

        });

    });

    describe("proceedInterchange", ()=> {

        it(`should return correct new state`, () => {

            const result = proceedInterchange(fakeStateCase1);

            expect(result.transactions[0]).to.eql({
                from: '1', to: '2', total: 611.4
            });

            expect(result.transactions[1]).to.eql({
                from: '1', to: '3', total: 1144.4
            });

        });

    });

});