import {nestedMap} from './immutable-converter';
import Immutable, { OrderedMap, List, Map } from 'immutable';

const { assert } = require('chai').use(require('chai-immutable'));

describe("UNIT / Utils / Immutable converter", () => {

    describe("#nestedMap()", () => {

        it(`converting 1-level obj`, () => {

            assert.equal(
                nestedMap({
                    a: '1',
                    b: '2'
                }),
                Map({
                    a: '1',
                    b: '2'
                })
            );

        });

        it(`converting 2-level obj`, () => {

            assert.equal(
                nestedMap({
                    a: {
                        b: {
                            c: '1'
                        }
                    },
                    d: {
                        e: {
                            f: '2'
                        }
                    }
                }),
                Map({
                    a: Map({
                        b: Map({
                            c: '1'
                        })
                    }),
                    d: Map({
                        e: Map({
                            f: '2'
                        })
                    })
                })
            );

        });

        it(`access nested attrs`, () => {

            const result = nestedMap({
                a: {
                    b: {
                        c: '1'
                    }
                },
                d: {
                    e: {
                        f: '2'
                    }
                }
            });

            assert.equal(
                result.get('a').get('b').get('c'),
                '1'
            );

            assert.equal(
                result.get('d').get('e').get('f'),
                '2'
            );

        });

        it(`should be ordered map`, () => {

            assert.ok(
                Immutable.Map.isMap(
                    nestedMap({
                        a: {
                            b: {
                                c: '1'
                            }
                        },
                        d: {
                            e: {
                                f: '2'
                            }
                        }
                    })
                )
            );

        });

        it(`should convert array of obj-s to OrderedMap`, () => {

            const result = nestedMap({
                a: {
                    b: [
                        { id: '1', name: 'name1' },
                        { id: '2', name: 'name2' },
                        { id: '3', name: 'name3' }
                    ]
                }
            });

            assert.equal(
                result.get('a').get('b').get('1').get('name'),
                'name1'
            );

            assert.equal(
                result.get('a').get('b').get('3').get('name'),
                'name3'
            );

            assert.ok(
                Immutable.Map.isMap( result.get('a').get('b') )
            );

        });

        it(`items inside arrays should be of Map type`, () => {

            const result = nestedMap({
                a: {
                    b: [
                        { id: '1', name: 'name1' },
                        { id: '2', name: 'name2' },
                        { id: '3', name: 'name3' }
                    ]
                }
            });

            assert.ok(
                Immutable.Map.isMap(
                    result.get('a').get('b').get('1')
                )
            );

        });

        it(`should convert deep array of strings to List`, () => {

            const result = nestedMap({
                errors: {
                    common: ['Share share share!']
                }
            });

            assert.equal(result.get('errors').get('common').get(0), 'Share share share!');

        });

        it(`should convert array of items argument to List`, () => {

            const result = nestedMap([
                { from: '1', to: '2', total: 611.4 },
                { from: '1', to: '3', total: 1144.4 }
            ]);

            const expected = List([
                Map({ from: '1', to: '2', total: 611.4 }),
                Map({ from: '1', to: '3', total: 1144.4 })
            ]);

            assert.equal(
                result,
                expected
            );

        });

        it(`should convert array of strings argument to List`, () => {

            const result = nestedMap([
                '123',
                '456'
            ]);

            const expected = List([
                '123',
                '456'
            ]);

            assert.equal(
                result,
                expected
            );

        });

    });

});