import {
    totalExpenses,
    ownExpenses,
    shareInMonetary,
    createTransaction,
    tryTransaction,
    transactionsTotal, INCOME, OUTCOME
} from '../../../src/core/utils'
import fakeState from '../../fixtures/fake-state'

import { given } from 'mocha-testdata';

describe("UNIT / Core / Utils", ()=> {

    // todo: Better fixtures for comprehensive tests

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
            expect(resultState.transactions).to.have.lengthOf(1);
            expect(resultState.transactions[0]).to.eql({from: '1', to: '2', total: 200});

        });

        // todo: prevent interchange between nonexistent persons

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

    });

});