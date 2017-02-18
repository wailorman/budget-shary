import {nestedMap} from './immutable-converter';
import Immutable, { OrderedMap, List } from 'immutable';

describe("UNIT / Utils / Immutable converter", () => {

    describe("#nestedMap()", () => {

        it(`converting 1-level obj`, () => {

            assert.equal(
                nestedMap({
                    a: '1',
                    b: '2'
                }),
                OrderedMap({
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
                OrderedMap({
                    a: OrderedMap({
                        b: OrderedMap({
                            c: '1'
                        })
                    }),
                    d: OrderedMap({
                        e: OrderedMap({
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

            assert(
                Immutable.OrderedMap.isOrderedMap(
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

            assert(
                Immutable.OrderedMap.isOrderedMap( result.get('a').get('b') )
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

            assert(
                Immutable.Map.isMap(
                    result.get('a').get('b').get('1')
                )
            );

        });

    });

});