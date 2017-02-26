import {Map} from 'immutable';
import * as s from './persons';

describe('UNIT / Selectors / persons', () => {

    const state = {
        persons: Map({
            'pers1': Map({
                id: 'pers1',
                name: 'Timmy',
                share: '50'
            }),
            'pers2': Map({
                id: 'pers2',
                name: 'Alice',
                share: '50'
            })
        })
    };

    describe('#personsSelector()', () => {

        it(`should return Map`, ()=>{

            assert.ok(Map.isMap(s.personsSelector(state)));

        });

    });

    describe('#onePersonSelector()', () => {

        it(`should return object`, ()=>{

            assert.equal(typeof s.onePersonSelector('pers1')(state), 'object');

        });

        it(`should return object w/ id,name,share`, ()=>{

            const result = s.onePersonSelector('pers1')(state);

            assert.equal(result.id, 'pers1');
            assert.equal(result.name, 'Timmy');
            assert.equal(result.share, '50');

        });

    });

    describe('#personsIdsSelector()', () => {

        it(`should return array`, ()=>{

            assert.equal(s.personsIdsSelector(state).constructor, Array);

        });

        it(`should return correct ids`, ()=>{

            const res = s.personsIdsSelector(state);

            assert.deepEqual(res, [
                'pers1',
                'pers2'
            ]);

        });

    });

});
