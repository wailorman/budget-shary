import {Map} from 'immutable';
import {productParticipatingSelector} from '../participating';

describe('UNIT / Selectors / Participating', () => {

    describe('#productParticipatingSelector()', () => {

        it(`should return all persons w/ participating state`, ()=>{

            const state = {
                persons: Map({
                    'pers1': {
                        name: 'Tobby'
                    },
                    'pers2': {
                        name: 'Mike'
                    }
                }),
                products: Map({
                    'prod1': {
                        name: 'Milk',
                        price: '100'
                    },
                    'prod2': {
                        name: 'Cholocate',
                        price: '50'
                    }
                }),
                productParticipating: Map({
                    'prod1': Map({
                        'pers1': true,
                        'pers2': false
                    }),
                    'prod2': Map({
                        'pers2': false
                    })
                })
            };

            const expected = [
                ['pers1', 'Tobby', true],
                ['pers2', 'Mike', false]
            ];

            const actual = productParticipatingSelector('prod1')(state);

            assert.deepEqual( actual, expected );

        });

        it(`should return [] if state empty`, ()=>{

            const state = {
                persons: Map(),
                products: Map(),
                productParticipating: Map()
            };

            const expected = [];

            const actual = productParticipatingSelector('prod1')(state);

            assert.deepEqual( actual, expected );

        });

    });

});
