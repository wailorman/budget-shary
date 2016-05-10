import { validatePersons, validateOnePerson, validateProducts } from '../../../src/core/validation'
import { given } from 'mocha-testdata'

describe("UNIT / Core / Validation", ()=> {

    describe("#validateOnePerson()", ()=> {

        given(
            {},
            null,
            undefined
        ).it(`should return undefined if person obj didn't passed`, (person) => {

            const actual = validateOnePerson(person);

            const expected = undefined;

            expect(actual).to.eql(expected);

        });

        given(
            [undefined,         {id: '1',  name: 'One',    share: '100'}],

            ['Share missing',   {id: '1',  name: 'One'}                 ],

            ['Name missing',    {id: '1',                  share: '100'}],

            ['ID missing',      {          name: 'One',    share: '100'}]

        ).it(`should return error if some of persons doesn't have some props`, (expectedError, person) => {

            const errorsArray = validateOnePerson(person);

            if (expectedError) {

                expect(errorsArray).to.include(expectedError);

            }

        });

        it(`should return two errors`, () => {

            const expectedErrors = ['ID missing', 'Name missing'];

            const person = {share: '100'};

            const actual = validateOnePerson(person);

            expectedErrors.forEach((err) => {

                expect(actual).to.include(err);

            });

        });

        describe(".id", ()=> {

            given(
                101, // todo: Should support numbers. Because JS is duck typed!
                true,
                [1]
            ).it(`should return error if id is not string`, (id) => {

                const persons = {id, name: 'One', share: '100'};

                const actual = validateOnePerson(persons);

                const expected = `ID should be a string. Got ${typeof id} instead`;

                expect(actual).to.include(expected);

            });

        });

        describe(".name", ()=> {

            it(`should allow empty name string`, () => {

                const persons = {id: '1', name: '', share: '100'};

                const actual = validateOnePerson(persons);

                expect(actual).to.not.include('Name missing');

            });

        });

        describe(".share", ()=> {

            it(`should support decimal share (with dots)`, () => {

                const persons = {id: '1', name: 'One', share: '100.0'};

                const actual = validateOnePerson(persons);

                expect(actual).to.not.include('Share allows only digits & dots');

            });

            given(
                '100,1', // russian fraction style
                '100,1a',
                '100 1a',
                '100 1',
                'one hundred'
            ).it(`should return error if share contain not only digits and dots`, (share) => {

                const persons = {id: '1', name: 'One', share};

                const actual = validateOnePerson(persons);

                expect(actual).to.include('Share allows only digits & dots');

            });

        });

    });

    describe("#validatePersons()", ()=> {

        it(`should return undefined if undefined (no persons) passed`, () => {

            const expected = undefined;

            const actual = validatePersons();

            expect(actual).to.eql(expected);

        });

        it(`should return undefined if [] (no persons) passed`, () => {

            const expected = undefined;

            const actual = validatePersons([]);

            expect(actual).to.eql(expected);

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

    });

});