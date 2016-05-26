import {
    totalExpenses,
    ownExpenses,
    shareInMonetary,

    createTransaction,
    validateTransactionMembers,
    generateTransaction,
    generateTransactionWithFunds,

    getFundsForAllPersons,

    tryTransaction,
    transactionsTotal, INCOME, OUTCOME,
    getFunds,
    splitToNegativeAndPositive,
    proceedInterchange,
    humanifyTransactions,


    getFlatValidationErrors,
    sumAllShares
} from '../../../src/core/utils'

import {
    fakeState,
    fakeStateCase1,
    fakeStateCase1WithTransactions
} from '../../fixtures/fake-state'

import { given } from 'mocha-testdata';
import deepFreeze from 'deep-freeze'

describe("UNIT / Core / Utils", ()=> {

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

    describe("#totalExpenses()", ()=> {

        it(`should calculate expenses of all persons`, () => {

            const products = fakeState.products;

            expect(totalExpenses({products})).to.eql(100);

        });

    });

    describe("#ownExpenses()", ()=> {

        it(`should calculate expenses for specific person`, () => {

            const products = fakeState.products;

            expect(ownExpenses({products}, '1')).to.eql(40);
            expect(ownExpenses({products}, 1)).to.eql(40);

        });

    });

    describe("#shareInMonetary()", ()=> {

        it(`should return share in monetary equivalent`, () => {

            expect(shareInMonetary(fakeState, '1')).to.eql(40);

        });

    });

    describe("#createTransaction()", ()=> {

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

    describe("#validateTransactionMembers()", ()=> {

        const personsArray = [
            {id: 1},
            {id: 2}
        ];

        it(`should throw error if sender doesn't persist in persons array`, () => {

            const callingResult = validateTransactionMembers.bind(null, 3, 2, personsArray);

            expect(callingResult).to.throw(/doesn't exist/i);
            expect(callingResult).to.throw(/id 3/i);

        });

        it(`should throw error if receiver doesn't persist in persons array`, () => {

            const callingResult = validateTransactionMembers.bind(null, 2, 4, personsArray);

            expect(callingResult).to.throw(/doesn't exist/i);
            expect(callingResult).to.throw(/id 4/i);

        });

        it(`should throw error if neither sender or receiver don't persist in persons array`, () => {

            const callingResult = validateTransactionMembers.bind(null, 3, 4, personsArray);

            expect(callingResult).to.throw(/doesn't exist/i);
            expect(callingResult).to.throw(/id 3 & 4/i);

        });

        it(`should throw error if sender == receiver`, () => {

            const callingResult = validateTransactionMembers.bind(null, 1, 1);

            expect(callingResult).to.throw(/are the same/i);

        });

        it(`should warn if we didn't passed persons array`, () => {

            validateTransactionMembers(1, 2);

            expect(console.warn.callCount).to.eql(1);
            expect(console.warn.lastCall.args[0]).to.match(/persons array is empty/i);

        });

        given(
            [1, 2],
            [1, 3],
            [4, 3]
        ).
        it(`should not throw anything if persons array == null`, (from, to) => {

            const callingResult = validateTransactionMembers.bind(null, from, to);

            expect(callingResult).to.not.throw();

        });

    });

    describe("#generateTransaction()", ()=> {

        const {persons} = fakeState;

        it(`should create simple transaction`, () => {

            const result = generateTransaction('1', '2', 200, persons);

            expect(result.from).to.eql('1');
            expect(result.to).to.eql('2');
            expect(result.total).to.eql(200);

        });

        it(`should not create transaction if one of members don't exist`, () => {

            const tryToCall_from = generateTransaction.bind(null, '1', '3', 200, persons);

            expect(tryToCall_from).to.throw(/3 doesn't exist/);

            /////////////////////////

            const tryToCall_to = generateTransaction.bind(null, '0', '2', 200, persons);

            expect(tryToCall_to).to.throw(/0 doesn't exist/);

        });

        it(`should create transaction if we didn't pass persons array`, () => {

            const result = generateTransaction('1', '2', 200);

            expect(result.from).to.eql('1');
            expect(result.to).to.eql('2');
            expect(result.total).to.eql(200);

        });

        it(`should not create transact w/ negative total`, () => {

            const tryToCall_negative = generateTransaction.bind(null, '1', '2', -1, persons);

            expect(tryToCall_negative).to.throw(/can't/i);
            expect(tryToCall_negative).to.throw(/negative/);

        });

        it(`should create transactions with total == 0`, () => {

            const resultState = generateTransaction('1', '2', 0, persons);

            expect(resultState.from).to.eql('1');
            expect(resultState.to).to.eql('2');
            expect(resultState.total).to.eql(0);

        });

    });

    describe("#generateTransactionWithFunds()", ()=> {

        it(`should generate transaction with fundsBefore & fundsAfter`, () => {

            const expectedFundsBefore = [
                {1: 1755.8},
                {2: -611.4},
                {3: -1144.4}
            ];

            const expectedFundsAfter = [
                {1: 1144.4},
                {2: 0},
                {3: -1144.4}
            ];

            const result = generateTransactionWithFunds(fakeStateCase1, '1', '2', 611.4);

            expect(result.fundsBefore).to.eql(expectedFundsBefore);
            expect(result.fundsAfter).to.eql(expectedFundsAfter);

            expect(result.from).to.eql('1');
            expect(result.to).to.eql('2');
            expect(result.total).to.eql(611.4);

        });

    });

    describe("#getFundsForAllPersons()", ()=> {

        it(`should calculate funds before interchange`, () => {

            const expected = [
                {1: 1755.8},
                {2: -611.4},
                {3: -1144.4}
            ];

            expect(getFundsForAllPersons(fakeStateCase1)).to.eql(expected);

        });

        it(`should calculate funds after interchange`, () => {

            const expected = [
                {1: 0},
                {2: 0},
                {3: 0}
            ];

            expect(getFundsForAllPersons(fakeStateCase1WithTransactions)).to.eql(expected);

        });

        it(`should fill with null & log error if getFunds throwed an error`, () => {

            let getFundsStub = sandbox.stub();

            getFundsStub
                .withArgs(sinon.match.any, '1')
                .throws('Some error!')

                .withArgs(sinon.match.any, '2')
                .returns(-611.4)

                .withArgs(sinon.match.any, '3')
                .returns(-1144.4);

            const expected = [
                {1: null},
                {2: -611.4},
                {3: -1144.4}
            ];

            const result = getFundsForAllPersons(fakeStateCase1, {getFunds: getFundsStub});

            expect(result).to.eql(expected);

            expect(console.error.callCount).to.eql(1);
            expect(console.error.lastCall.args[0]).to.match(/some error/i);

        });

    });

    describe("#tryTransaction()", ()=> {

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

    describe("#transactionsTotal()", ()=> {

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

    describe("#getFunds()", ()=> {

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

    describe("#splitToNegativeAndPositive()", ()=> {

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

    describe("#proceedInterchange()", ()=> {

        it(`should return correct new state`, () => {

            deepFreeze(fakeStateCase1);

            const result = proceedInterchange(fakeStateCase1);

            expect(result.transactions[0]).to.eql({
                from: 'Jack', to: 'Alice', total: 611.4
            });

            expect(result.transactions[1]).to.eql({
                from: 'Jack', to: 'Mike', total: 1144.4
            });

        });

        it(`should remove old transactions`, () => {

            const result = proceedInterchange(proceedInterchange(fakeStateCase1));

            expect(result.transactions.length).to.eql(2);

        });

    });

    describe("#humanifyTransactions()", ()=> {

        it(`should convert transaction members ids to names`, () => {

            //fakeStateCase1WithTransactions

            const expected = [
                {from: 'Jack', to: 'Alice', total: 611.4},
                {from: 'Jack', to: 'Mike', total: 1144.4}
            ];

            const actual = humanifyTransactions(fakeStateCase1WithTransactions).transactions;

            expect(actual).to.eql(expected);

        });

        it(`should return the same state if no transactions`, () => {

            const state = {
                persons: [],
                products: []
            };

            const expected = {
                persons: [],
                products: [],
                transactions: []
            };

            const actual = humanifyTransactions(state);

            expect(actual).to.eql(expected);

        });

        it(`should log error if one of persons not exist`, () => {

            const state = {
                persons: [],
                products: [],
                transactions: [
                    {from: '1', to: '2', total: 100}
                ]
            };

            humanifyTransactions(state);

            expect(console.error.callCount).to.eql(2);
            expect(console.error.getCall(0).args[0]).to.match(/can't get name of #1/i);
            expect(console.error.getCall(1).args[0]).to.match(/can't get name of #2/i);

        });

        it(`should use id if person name is not available`, () => {

            const state = {
                persons: [
                    {id: '1', name: 'Eric', share: '50'}
                ],
                products: [],
                transactions: [
                    {from: '1', to: '2', total: 100}
                ]
            };

            const actual = humanifyTransactions(state);

            expect(actual.transactions.length).to.eql(1);
            expect(actual.transactions[0]).to.eql({from: 'Eric', to: '2', total: 100});

        });

    });

    describe("#sumAllShares", ()=> {

        it(`should sum shares`, () => {

            const persons = [
                {
                    share: '50'
                },
                {
                    share: '50'
                }
            ];

            const actual = sumAllShares(persons);

            const expected = 100;

            expect(actual).to.eql(expected);

        });

        it(`should ignore persons who don't have shares`, () => {

            const persons = [
                {
                    share: '50'
                },
                {
                    share: '50'
                },
                {
                    name: 'Hey-yo'
                }
            ];

            const actual = sumAllShares(persons);

            const expected = 100;

            expect(actual).to.eql(expected);

        });

        it(`should return 0 if no persons`, () => {

            const persons = [];

            const actual = sumAllShares(persons);

            const expected = 0;

            expect(actual).to.eql(expected);

        });

    });

});