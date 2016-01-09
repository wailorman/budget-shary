"use strict";

const PersonItem = require('../../../src/components/PersonItem/PersonItem');
const Person = require('../../../src/core/models/person');

describe("unit/components/PersonItem", ()=> {

    it(`should return correct initial state`, () => {

        let thisScope = {props: {person: new Person()}};

        let initialState = PersonItem.prototype.getInitialState.call(thisScope);

        expect(initialState.name).to.eql("");
        expect(initialState.share).to.eql(0);

    });

    describe("convertParsedShareForModel", ()=> {

        let convertParsedShareForModel;

        beforeEach(()=> {

            convertParsedShareForModel = PersonItem.prototype.convertParsedShareForModel;

        });

        it(`should convert 50 to 0.5`, () => {
            expect(convertParsedShareForModel(50)).to.eql(0.5);
        });

        it(`should return NaN on undefined`, () => {
            expect(convertParsedShareForModel(undefined)).to.eql(NaN);
        });

        it(`should return NaN on NaN`, () => {
            expect(convertParsedShareForModel(NaN)).to.eql(NaN);
        });

        it(`should return 0 on ""`, () => {
            expect(convertParsedShareForModel("")).to.eql(0);
        });

    });

    describe("isConvertedShareValid", ()=> {

        let isConvertedShareValid;

        beforeEach(()=> {

            isConvertedShareValid = PersonItem.prototype.isConvertedShareValid;

        });

        it(`should not apply -1`, () => {
            assert.isFalse(isConvertedShareValid(-1));
        });

        it(`should apply 0`, () => {
            assert.isTrue(isConvertedShareValid(0));
        });

        it(`should apply 0.5`, () => {
            assert.isTrue(isConvertedShareValid(0.5));
        });

        it(`should apply 1`, () => {
            assert.isTrue(isConvertedShareValid(1));
        });

        it(`should not apply 1.5`, () => {
            assert.isFalse(isConvertedShareValid(1.5));
        });

        it(`should not apply undefined`, () => {
            assert.isFalse(isConvertedShareValid(undefined));
        });

    });

    xdescribe("handleShareChange", ()=> {

        let thisScope;
        let handleShareChange;

        beforeEach(()=> {

            thisScope = {
                state: {},
                setState: sinon.stub()
            };

            handleShareChange = function (newShare) {
                return PersonItem.prototype.handleShareChange.call(thisScope, {target: {value: newShare}});
            };

        });

        it(`should update state on new share value`, () => {

            handleShareChange(50);

            let args = thisScope.setState.lastCall.args;

            expect(args[0].share).to.eql(50);

        });

        const shareVariations = {
            valid: ["0", "1", "99", "100"],
            invalid: ["-1", "101", "a", "", "  "]
        };


        _.each(shareVariations, (shares, validity)=> {


            shares.forEach((shareVal)=> {

                it(`should mark as ${validity} share="${shareVal}"`, () => {

                    handleShareChange(shareVal);
                    let isShareValid = thisScope.setState.lastCall.args[0]._.valid.share;

                    if (validity == 'valid') {

                        expect(isShareValid).to.be.true;

                    } else {

                        expect(isShareValid).to.be.false;

                    }

                });

            });


        });


    });

});