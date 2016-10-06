import {validateCollection, validate} from './validation'
import * as constrains from './validation-constrains'

describe("UNIT / Core / Validation", ()=> {

    describe("#validateCollection()", ()=> {

        const setup = function () {

            const collection = [
                { id: '1', name: 'Erick', share: '50' },
                { id: '2', name: 'Jimmy', share: '50' },
                { id: '3', name: 'John', share: '50' },
                { id: '4', name: 'Barak', share: '50' },
                { id: '5', name: 'Putin', share: '50' },
                { id: '6', name: 'ErdoGUN', share: '50' },
                { id: '7', name: 'TIMMY', share: '50' }
            ];

            const constrains = {
                name: {
                    presence: true
                },
                share: {
                    presence: true,
                    numericality: {
                        greaterThanOrEqualTo: 0,
                        lessThanOrEqualTo: 100,
                        message: 'must satisfy expression 0 <= x <= 100'
                    }
                }
            };

            return { collection, constrains };

        };

        it(`should return array of undefined if all collection is valid`, () => {

            const {collection, constrains} = setup();

            const actual = validateCollection(collection, constrains);

            const expected = undefined;

            expect(actual).to.eql(expected);

        });

        it(`one element of returned collection should be validation result if some of collection elements are invalid`, () => {

            const {collection, constrains} = setup();

            collection[0].share = 200;

            const actual = validateCollection(collection, constrains);

            const expected = {
                1: { share: ['Share must satisfy expression 0 <= x <= 100'] }
            };

            expect(actual).to.eql(expected);

        });

        it(`should return {} if [] passed as a collection`, () => {

            const {constrains} = setup();

            const actual = validateCollection([], constrains);

            const expected = undefined;

            expect(actual).to.eql(expected);

        });

        it(`should return [] if undefined passed as a collection`, () => {

            const {constrains} = setup();

            const actual = validateCollection(undefined, constrains);

            const expected = undefined;

            expect(actual).to.eql(expected);

        });

    });

    describe("#validate()", ()=> {

        let sandbox, deps = {};

        const state = {
            persons: [
                { id: '1', name: 'Erick', share: '50' },
                { id: '2', name: 'Ann', share: '50' }
            ],
            products: [
                { id: '1', name: 'Milk', price: '100', ownerId: '1' },
                { id: '2', name: 'Water', price: '10', ownerId: '2' }
            ],
            common: {
                shareSum: 100
            }
        };

        beforeEach(()=> {

            sandbox = sinon.sandbox.create();

            deps.validateCollection = sandbox.stub();
            deps.validateJs = sandbox.stub();
        });

        afterEach(()=> {
            sandbox.restore();
        });

        it(`should return validation result`, () => {

            deps.validateCollection
                .withArgs(state.persons, constrains.person)
                .returns(['persons errors']);

            deps.validateCollection
                .withArgs(state.products, constrains.product)
                .returns(['products errors']);

            deps.validateJs
                .withArgs(state.common, constrains.common)
                .returns(['common errors']);

            const actual = validate(state, deps);

            const expected = {
                persons: ['persons errors'],
                products: ['products errors'],
                common: ['common errors']
            };

            expect(actual).to.eql(expected);

        });

    });

});