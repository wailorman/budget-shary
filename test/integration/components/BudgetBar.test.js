"use strict";

const BudgetBar = require('../../../src/components/BudgetBar/BudgetBar');
const Budget = require('../../../src/core/models/budget');

describe("integration/components/BudgetBar", ()=> {

    it("should render component without props", () => {

        let bar = ReactTestUtils.renderIntoDocument(
            <BudgetBar />
        );

        let barDOM = ReactTestUtils.findRenderedDOMComponentWithTag(bar, 'input');

        expect(barDOM.value).to.eql('');

    });

    it("should render component with props", () => {

        let testBudget = new Budget({name: 'Bud'});

        let barComponent = ReactTestUtils.renderIntoDocument(
            <BudgetBar budget={testBudget} />
        );

        let barDOM = ReactTestUtils.findRenderedDOMComponentWithTag(barComponent, 'input');

        expect(barDOM.value).to.eql('Bud');

    });

    it("should update model after input changing", () => {

        let testBudget = new Budget({name: 'Buddy'});

        let barComponent = ReactTestUtils.renderIntoDocument(
            <BudgetBar budget={testBudget} />
        );

        let barDOM = ReactTestUtils.findRenderedDOMComponentWithTag(barComponent, 'input');

        ReactTestUtils.Simulate.change(barDOM, {
            target: {
                value: 'New Name'
            }
        });

        assert.equal(testBudget.get('name'), "New Name", "name was updated incorrectly");

    });

});