import {List, Map} from 'immutable';
import * as s from './transactions';

describe('UNIT / Selectors / transactions', () => {

    const state = {
        transactions: List([
            Map({from: 'pers1', to: 'pers2', total: '400'}),
            Map({from: 'pers1', to: 'pers3', total: '100'}),
        ])
    };

    describe('#transactionsSelector()', () => {

        it(`should return List`, ()=>{

            assert.ok( List.isList( s.transactionsSelector(state) ) );

        });

    });

    describe('#transactionsArraySelector', () => {

        it(`should return Array`, ()=>{

            assert.equal(s.transactionsArraySelector(state).constructor, Array);

        });

        it(`should return array of plain objects`, ()=>{

            const res = s.transactionsArraySelector(state);

            res.map((transaction, i) => {
                assert.equal(transaction.constructor, Object, `transaction #${i}`);
            });

        });

        it(`each object should contain all values`, ()=>{

            const res = s.transactionsArraySelector(state);

            res.map((transaction, i) => {

                const expected = state.transactions.get(i).toJS();

                assert.deepEqual(
                    s.transactionsArraySelector(state)[i],
                    expected,
                    `transaction #${i}`
                );
            });

        });

    });

});
