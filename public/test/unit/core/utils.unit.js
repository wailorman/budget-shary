import {
    totalExpenses,
    ownExpenses,
    shareInMonetary,
    createTransaction,
    tryTransaction
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

});