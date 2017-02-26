import {Map, List} from 'immutable';
import * as s from './errors';

describe('UNIT / Selectors / errors', () => {

    const state = {
        errors: Map({
            products: Map({
                'prod1': Map({
                    'name': List(['Too long'])
                })
            })
        })
    };

    describe('#errorsSelector()', () => {

        it(`should return Map`, ()=>{

            assert.ok( Map.isMap( s.errorsSelector(state) ) );

        });

    });

    describe('#productErrorsSelector()', () => {

        it(`should return plain object`, ()=>{

            assert.equal( s.productErrorsSelector('prod1')(state).constructor, Object );

        });

        it(`should return correct values`, ()=>{

            assert.deepEqual( 
                s.productErrorsSelector('prod1')(state), state.errors.getIn(['products', 'prod1']).toJS()
            );

        });

    });

});
