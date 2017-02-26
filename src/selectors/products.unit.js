import {Map} from 'immutable';
import * as s from './products';

describe('UNIT / Selectors / products', () => {

    const state = {
        products: Map({
            'prod1': Map({
                id: 'prod1',
                name: 'Milk',
                price: '20',
                ownerId: 'pers1'
            }),
            'prod2': Map({
                id: 'prod2',
                name: 'Chips',
                price: '30',
                ownerId: 'pers3'
            })
        })
    };

    describe('#productsSelector()', () => {

        it(`should return Map`, ()=>{

            assert.ok(Map.isMap(s.productsSelector(state)));

        });

    });

    describe('#productsIdsSelector()', () => {

        it(`should return array`, ()=>{

            assert.equal(s.productsIdsSelector(state).constructor, Array);

        });

        it(`should return correct ids`, ()=>{

            const res = s.productsIdsSelector(state);

            assert.deepEqual(res, [
                'prod1',
                'prod2'
            ]);

        });

    });

    describe('#oneProductSelector()', () => {

        it(`should return object`, ()=>{

            assert.equal(typeof s.oneProductSelector('prod1')(state), 'object');

        });

        it(`should return object w/ id,name,share`, ()=>{

            const result = s.oneProductSelector('prod1')(state);

            assert.equal(result.id, 'prod1');
            assert.equal(result.name, 'Milk');
            assert.equal(result.price, '20');
            assert.equal(result.ownerId, 'pers1');

        });

    });

    describe('#ownProductsIdsSelector()', () => {

        it(`should return Array`, ()=>{

            assert.equal(s.ownProductsIdsSelector('pers1')(state).constructor, Array);

        });

        it(`should return correct ids`, ()=>{

            const res = s.ownProductsIdsSelector('pers1')(state);

            assert.deepEqual(res, [
                'prod1'
            ]);

        });

    });

});
