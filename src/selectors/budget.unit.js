import {Map} from 'immutable';
import * as bS from './budget';

describe('UNIT / Selectors / budget', () => {

    const state = {
        budget: Map({
            name: 'Pretty'
        })
    };

    describe('#budgetSelector()', () => {

        it(`should return budget Map`, ()=>{

            const result = bS.budgetSelector(state);

            assert.ok(Map.isMap(result));

        });

    });

    describe('#budgetNameSelector()', () => {

        it(`should return string`, ()=>{

            assert.equal( typeof bS.budgetNameSelector(state), 'string' );

        });

        it(`should return budget name`, ()=>{

            assert.equal( bS.budgetNameSelector(state), 'Pretty' );

        });

    });

});
