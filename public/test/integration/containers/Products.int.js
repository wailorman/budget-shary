import TestUtils from 'react-addons-test-utils'
import Products from '../../../src/containers/Products'

import { fakeState } from '../../fixtures/fake-state'
import { generateStore } from '../../../src/store'

describe("INT / Containers / Products", function () {

    let store;

    const setup = function () {
        let props = {
            products: fakeState.products,
            actions: {
                removeProduct: sinon.spy()
            }
        };

        let component = TestUtils.renderIntoDocument(<Products {...props} />);
        let output = ReactDOM.findDOMNode(component);

        return {
            props,
            output,
            component
        };
    };

    it(`should render 2 products`, () => {

        const {output} = setup();

        expect(output.childElementCount).to.eql(2);

    });

    it(`should have 2 buttons`, () => {

        const {output, component} = setup();

        const buttons = TestUtils.scryRenderedDOMComponentsWithTag(
            component,
            'button'
        );

        expect(buttons.length).to.eql(2);

    });

    it(`should remove first product`, () => {

        const {output, component, props} = setup();

        const buttons = TestUtils.scryRenderedDOMComponentsWithTag(
            component,
            'button'
        );

        TestUtils.Simulate.click(buttons[0]);

        expect(props.actions.removeProduct.lastCall.args[0]).to.eql("1");

    });

    it(`should remove second product`, () => {

        const {output, component, props} = setup();

        const buttons = TestUtils.scryRenderedDOMComponentsWithTag(
            component,
            'button'
        );

        TestUtils.Simulate.click(buttons[1]);

        expect(props.actions.removeProduct.lastCall.args[0]).to.eql("2");

    });

});