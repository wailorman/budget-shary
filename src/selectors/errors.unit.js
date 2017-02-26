import {Map, List} from 'immutable';
import * as s from './errors';

describe('UNIT / Selectors / errors', () => {

    const state = {
        errors: Map({
            products: Map({
                'prod1': Map({
                    'name': List(['Too long'])
                })
            }),
            persons: Map({
                'pers1': Map({
                    'share': List(['Wrong!'])
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

        it(`should return correct values`, ()=>{

            assert.deepEqual(
                s.productErrorsSelector('prod1')(state),
                {
                    'name': ['Too long']
                }
            );

        });

    });

    describe('#personErrorsSelector()', () => {

        it(`should return correct values`, ()=>{

            assert.deepEqual(
                s.personErrorsSelector('pers1')(state),
                {
                    'share': ['Wrong!']
                }
            );

        });

    });

    describe('#errorsByPathSelector()', () => {

        it(`should return plain object`, ()=>{

            const res = s.errorsByPathSelector('products')(state.errors);

            assert.equal( res.constructor, Object );

        });

        it(`should return {} if no such path`, ()=>{

            const res = s.errorsByPathSelector('boys')(state.errors);

            assert.deepEqual(
                res,
                {}
            );

        });

        it(`should return correct values`, ()=>{

            const res = s.errorsByPathSelector('products')(state.errors);

            assert.deepEqual(
                res,
                state.errors.getIn(['products']).toJS()
            );

        });

        it(`should accept 2-level path (array)`, ()=>{

            const res = s.errorsByPathSelector(['products','prod1'])(state.errors);

            assert.deepEqual(
                res,
                state.errors.getIn(['products', 'prod1']).toJS()
            );

        });

        it(`should accept 2-level path (string)`, ()=>{

            const res = s.errorsByPathSelector('products.prod1')(state.errors);

            assert.deepEqual(
                res,
                state.errors.getIn(['products', 'prod1']).toJS()
            );

        });

    });

});
