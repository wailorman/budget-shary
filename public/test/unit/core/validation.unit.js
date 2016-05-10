import { validatePersons, validateProducts } from '../../../src/core/validation'
import { given } from 'mocha-testdata'

describe("UNIT / Core / Validation", ()=> {

    describe("#validatePersons()", ()=> {

        it(`should return undefined if undefined passed`, () => {

            const expected = undefined;

            const actual = validatePersons();

            expect(actual).to.eql(expected);

        });

        it(`should return undefined if [] passed`, () => {

            const expected = undefined;

            const actual = validatePersons([]);

            expect(actual).to.eql(expected);

        });

        given(
            [undefined,         [{id: '1',  name: 'One',    share: '100'}]],

            ['Share missing',   [{id: '1',  name: 'One'}                 ]],

            ['Name missing',    [{id: '1',                  share: '100'}]],

            ['ID missing',      [{          name: 'One',    share: '100'}]]

        ).it(`should return error if some of persons doesn't have some props`, (expectedErrors, persons) => {

            const errorsArray = validatePersons(persons);

            if (expectedErrors) {

                expectedErrors = `Person #0: ${expectedErrors}`;

                expect(errorsArray).to.include(expectedErrors);
            }

        });

        it(`should return two errors`, () => {

            const expectedErrors = ['ID missing', 'Name missing'];

            const persons = [{share: '100'}];

            const actual = validatePersons(persons);

            expectedErrors.forEach((err) => {

                err = `Person #0: ${err}`;

                expect(actual).to.include(err);

            });

        });

        it(`should allow empty name string`, () => {

            const persons = [{id: '1', name: '', share: '100'}];

            const actual = validatePersons(persons);

            expect(actual).to.not.include('Person #0: Name missing');

        });

        it(`should return error if sum of shares != 100`, () => {

            const persons = [
                {name: 'one', share: '50'},
                {name: 'one', share: '40'}
            ];

            const expected = 'Sum of shares should be equal to 100. Got 90 instead';

            const actual = validatePersons(persons);

            expect(actual).to.include(expected);

        });

        describe("id", ()=> {

        });

        describe("name", ()=> {

        });

        describe("share", ()=> {

        });

        describe("types checking", ()=> {

            given(
                101, // todo: Should support numbers. Because JS is duck typed!
                true,
                [1]
            ).it(`should return error if id is not string`, (id) => {

                const persons = [{id, name: 'One', share: '100'}];

                const actual = validatePersons(persons);

                const expected = `Person #0: ID should be a string. Got ${typeof id} instead`;

                expect(actual).to.include(expected);

            });

            it(`should support decimal share (with dots)`, () => {

                const persons = [{id: '1', name: 'One', share: '100.0'}];

                const actual = validatePersons(persons);

                expect(actual).to.not.include('Person #0: Share allows only digits & dots');

            });

            given(
                '100,1', // russian fraction style
                '100,1a',
                '100 1a',
                '100 1',
                'one hundred'
            ).it(`should return error if share contain not only digits and dots`, (share) => {

                const persons = [{id: '1', name: 'One', share}];

                const actual = validatePersons(persons);

                expect(actual).to.include('Person #0: Share allows only digits & dots');

            });

        });

    });

});