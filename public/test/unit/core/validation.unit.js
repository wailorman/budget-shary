import {
    validatePersons,
    validateOnePerson,
    validateProducts,

    trimObjectFromEmptyArrays
} from '../../../src/core/validation'
import { given } from 'mocha-testdata'

describe("UNIT / Core / Validation", ()=> {

    describe("#trimObjectsFromEmptyArrays", ()=> {

        it(`should remove property if it === []`, () => {

            const object = {
                filled: [1],
                empty: []
            };

            const actual = trimObjectFromEmptyArrays(object);

            const expected = { filled: [1] };

            expect(actual).to.eql(expected);

        });

    });

    describe("#validateOnePerson()", ()=> {

        given(
            {},
            null,
            undefined
        ).it(`should return empty errors object if person obj didn't passed`, (person) => {

            const actual = validateOnePerson(person);

            const expected = {
                id: [],
                name: [],
                share: [],
                common: []
            };

            expect(actual).to.eql(expected);

        });

        given(
            [undefined,                     {id: '1',  name: 'One',    share: '100'}],
            [{share: ['Share missing']},    {id: '1',  name: 'One'}                 ],
            [{name: ['Name missing']},      {id: '1',                  share: '100'}],
            [{id: ['ID missing']},          {          name: 'One',    share: '100'}]

        ).it(`should return error if some of persons doesn't have some props`, (expectedError, person) => {

            const errorsArray = validateOnePerson(person);

            if (expectedError) {

                const errorKey = _.keys(expectedError)[0];
                const errorValue = _.values(expectedError)[0];

                expect(errorsArray[errorKey]).to.eql(errorValue);

            }

        });

        it(`should return two errors`, () => {

            const expectedErrors = [
                {id: ['ID missing']},
                {name: ['Name missing']}
            ];

            const person = {share: '100'};

            const actual = validateOnePerson(person);

            _.forEach(expectedErrors, (expectedError) => {

                const errorKey = _.keys(expectedError)[0];
                const errorValue = _.values(expectedError)[0];

                expect(actual[errorKey]).to.eql(errorValue);

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

                const expected = [`ID should be a string. Got ${typeof id} instead`];

                expect(actual.id).to.eql(expected);

            });

        });

        describe(".name", ()=> {

            it(`should allow empty name string`, () => {

                const persons = {id: '1', name: '', share: '100'};

                const actual = validateOnePerson(persons);

                expect(actual.name).to.not.include('Name is missing');

            });

        });

        describe(".share", ()=> {

            it(`should support decimal share (with dots)`, () => {

                const persons = {id: '1', name: 'One', share: '100.0'};

                const actual = validateOnePerson(persons);

                expect(actual.share).to.not.include('Share allows only digits & dots');

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

                expect(actual.share).to.include('Share allows only digits & dots');

            });

        });

    });

    describe("#validatePersons()", ()=> {

        it(`should return undefined if undefined (no persons) passed`, () => {

            const expected = {
                persons: [],
                common: []
            };

            const actual = validatePersons();

            expect(actual).to.eql(expected);

        });

        it(`should return undefined if [] (no persons) passed`, () => {

            const expected = {
                persons: [],
                common: []
            };

            const actual = validatePersons([]);

            expect(actual).to.eql(expected);

        });

        it(`should return error if sum of shares != 100`, () => {

            const persons = [
                {name: 'one', share: '50'},
                {name: 'one', share: '40'}
            ];

            const expected = 'Sum of shares should be equal to 100. Got 90 instead';

            const actual = validatePersons(persons).common;

            expect(actual).to.include(expected);

        });
        
        it(`should notice about ID missing`, () => {

            const persons = [
                {         name: 'One', share: '50'},
                {id: '2', name: 'One', share: '50'}
            ];

            const actual = validatePersons(persons);

            const expectedErrMsg = 'ID missing';

            expect(actual.persons[0].id).to.contain(expectedErrMsg);

        });

    });

});