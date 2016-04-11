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
                removeProduct: sinon.spy(),
                newProduct: sinon.spy(),
                changeProduct: sinon.spy()
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

        const {output, component} = setup();
        const productNodes = TestUtils.scryRenderedDOMComponentsWithClass(
            component,
            'Product'
        );

        expect(productNodes.length).to.eql(2);

    });

    it(`should have 2 buttons`, () => {

        const {output, component} = setup();

        const buttons = TestUtils.scryRenderedDOMComponentsWithClass(
            component,
            'Product__remove-product'
        );

        expect(buttons.length).to.eql(2);

    });

    describe("product removing", ()=> {

        it(`should remove first product`, () => {

            const {output, component, props} = setup();

            const buttons = TestUtils.scryRenderedDOMComponentsWithClass(
                component,
                'Product__remove-product'
            );

            TestUtils.Simulate.click(buttons[0]);

            expect(props.actions.removeProduct.lastCall.args[0]).to.eql("1");

        });

        it(`should remove second product`, () => {

            const {output, component, props} = setup();

            const buttons = TestUtils.scryRenderedDOMComponentsWithClass(
                component,
                'Product__remove-product'
            );

            TestUtils.Simulate.click(buttons[1]);

            expect(props.actions.removeProduct.lastCall.args[0]).to.eql("2");

        });

    });

    describe("new product", ()=> {
        
        it(`should call newProduct`, () => {

            const {output, component, props} = setup();

            const newButton = TestUtils.findRenderedDOMComponentWithClass(
                component,
                'Products__new-product'
            );

            TestUtils.Simulate.click(newButton);

            expect(props.actions.newProduct.called).to.eql(true);

        });
        
    });

    describe("fields edit", ()=> {

        it(`should change state name`, () => {

            const {output, component, props} = setup();

            const nameInput = component.refs.product_1.refs.name;
            const nameInputNode = nameInput.getDOMNode();

            nameInputNode.value = 'Potato';

            TestUtils.Simulate.change(nameInputNode);

            const changeProductCallArgument = props.actions.changeProduct.lastCall.args;

            expect(changeProductCallArgument[0]).to.eql('1');
            expect(changeProductCallArgument[1].name).to.eql('Potato');
            expect(changeProductCallArgument[1].price).to.eql('40');


        });

        it(`should change state price`, () => {

            const {output, component, props} = setup();

            const priceInput = component.refs.product_1.refs.price;
            const priceInputNode = priceInput.getDOMNode();

            priceInputNode.value = '60';

            TestUtils.Simulate.change(priceInputNode);

            const changeProductCallArgument = props.actions.changeProduct.lastCall.args;

            expect(changeProductCallArgument[0]).to.eql('1');
            expect(changeProductCallArgument[1].name).to.eql('Water');
            expect(changeProductCallArgument[1].price).to.eql('60');

        });

    });

});