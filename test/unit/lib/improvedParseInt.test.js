"use strict";

const improvedParseInt = require('../../../src/lib/improvedParseInt');

describe("improvedParseInt", ()=> {

    it("should parse integers properly", function () {
        for (var i = 0; i <= 20; i++) {
            assert.equal(improvedParseInt("" + i), i);
        }
    });
    it("should parse number starting with properly", function () {
        for (var i = 0; i <= 10; i++) {
            assert.equal(improvedParseInt("0" + i), i);
            assert.equal(improvedParseInt("00" + i), i);
        }
    });
    it("should support white spaces", function () {
        for (var i = 0; i <= 20; i++) {
            assert.equal(improvedParseInt("  " + i), i);
            assert.equal(improvedParseInt("  " + i + "  "), i);
            assert.equal(improvedParseInt("\t" + i + "\n"), i);
        }
    });
    it("should return NaN for non-integer strings", function () {
        expect(isNaN(improvedParseInt("")));
        expect(isNaN(improvedParseInt("5 friends")));
        expect(isNaN(improvedParseInt("5friends")));
        expect(isNaN(improvedParseInt("I <3 u")));
        expect(isNaN(improvedParseInt("17.42")));
        expect(isNaN(improvedParseInt("0x10")));
        expect(isNaN(improvedParseInt("123~~")));
        expect(isNaN(improvedParseInt("1 1")));
        expect(isNaN(improvedParseInt("1 2 3")));
        expect(isNaN(improvedParseInt("1.0")));
    });

});