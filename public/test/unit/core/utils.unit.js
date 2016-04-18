import { totalExpenses, ownExpenses, shareInMonetary } from '../../../src/core/utils'
import fakeState from '../../fixtures/fake-state'

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

});