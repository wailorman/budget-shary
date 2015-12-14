"use strict";

const Budget = require('../../../../src/core/models/budget');

describe('Budget model unit', ()=> {

    it('should construct object with specified values', ()=> {

        let newBudget = new Budget({name: 'Party'});

        expect(newBudget.get('name')).to.eql('Party');

    });

    it('should construct with default values', ()=> {

        let newBudget = new Budget();

        expect(newBudget.get('name')).to.eql('');

    });

    describe("validation", ()=> {

        it("should allow to use string in name", () => {

            let budget = new Budget({name: "Party Rock"});

            assert.isTrue(budget.isValid(), "Budget with string as name should be valid");

        });

        it("should not apply other types in name", () => {

            let budgetNum = new Budget({name: 123});
            let budgetBoolean = new Budget({name: true});

            assert.isFalse(budgetNum.isValid(), "Budget with number as name should not be valid");
            assert.isFalse(budgetBoolean.isValid(), "Budget with boolean as name should not be valid");

        });

    });

});