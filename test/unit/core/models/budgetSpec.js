"use strict";

const Budget = require('../../../../src/core/models/budget');
const Dispatcher = require('../../../../src/dispatcher/dispatcher');
const actionNames = require('../../../../src/constants/action-names');
const PersonsCollection = require('../../../../src/core/collections/persons');

describe('Budget model unit', ()=> {

    it('should construct object with specified values', ()=> {

        let newBudget = new Budget({name: 'Party'});

        expect(newBudget.get('name')).to.eql('Party');

    });

    it('should construct with default values', ()=> {

        let newBudget = new Budget();

        expect(newBudget.get('name')).to.eql('');

    });

    it("should create empty PersonsCollection as default", () => {

        let newBudget = new Budget();

        let persons = newBudget.get('persons');

        expect(persons instanceof PersonsCollection).to.be.true;
        expect(persons.length).to.eql(0);

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

    describe("dispatcher", ()=> {

        let UPDATE_BUDGET = actionNames.budget.update;

        it(`should update budget name on '${UPDATE_BUDGET}' event`, () => {

            let budget = new Budget();
            let spy = sinon.spy();

            budget.on('change', spy);

            let newBudgetAttributes = {
                name: 'The New Budget'
            };

            Dispatcher.dispatch({
                eventName: UPDATE_BUDGET,
                attributes: newBudgetAttributes
            });

            expect(spy.callCount).to.eql(1);
            expect(budget.get('name')).to.eql(newBudgetAttributes.name);

        });

        it("should update only specified model", () => {

            let budget1 = new Budget();
            let budget2 = new Budget();

            let spy1 = sinon.spy();
            let spy2 = sinon.spy();

            let newBudgetAttributes = {
                name: 'Small budget'
            };

            budget1.on('change', spy1);
            budget2.on('change', spy2);

            Dispatcher.dispatch({
                eventName: UPDATE_BUDGET,
                model: budget2,
                attributes: newBudgetAttributes
            });

            expect(spy1.callCount).to.eql(0);
            expect(spy2.callCount).to.eql(1);

            expect(budget1.get('name')).to.eql('');
            expect(budget2.get('name')).to.eql(newBudgetAttributes.name);

        });

    });

});