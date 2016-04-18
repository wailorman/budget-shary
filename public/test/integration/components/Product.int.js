import Product from '../../../src/components/Product'

import { fakeState } from '../../fixtures/fake-state'

describe("INT / Components / Product", ()=> {


    const setup = function () {
        let props = {
            ...fakeState.products[0],

            removeProduct: sinon.spy(),
            changeProduct: sinon.spy()
        };

        let component = TestUtils.renderIntoDocument(<Product {...props} />);
        let output = ReactDOM.findDOMNode(component);

        return {
            props,
            output,
            component
        };
    };

    it(`should have name input`, () => {

        const {component} = setup();

        const nameInput = TestUtils.findRenderedDOMComponentWithClass(
            component,
            'Product__name-input'
        );

        expect(nameInput).to.exist;
        expect(nameInput.localName).to.eql('input');

    });

    it(`should have price input`, () => {

        const {component} = setup();

        const priceInput = TestUtils.findRenderedDOMComponentWithClass(
            component,
            'Product__price-input'
        );

        expect(priceInput).to.exist;
        expect(priceInput.localName).to.eql('input');

    });

    it(`should have remove button`, () => {

        const {component} = setup();

        const removeButton = TestUtils.findRenderedDOMComponentWithClass(
            component,
            'Product__remove-button'
        );

        expect(removeButton).to.exist;
        expect(removeButton.localName).to.eql('button')

    });

    describe("removing", ()=> {

        it(`should call removeProduct callback on remove button click`, () => {

            const {props, component} = setup();

            const removeButton = TestUtils.findRenderedDOMComponentWithClass(
                component,
                'Product__remove-button'
            );

            TestUtils.Simulate.click(removeButton);

            expect(props.removeProduct.called).to.eql(true);
            expect(props.removeProduct.lastCall.args[0]).to.eql(undefined);

        });

    });

    describe("edit", ()=> {

        it(`should call changeProduct on name change`, () => {

            const {props, component} = setup();

            const nameInput = TestUtils.findRenderedDOMComponentWithClass(
                component,
                'Product__name-input'
            );

            nameInput.value = 'Another value';

            TestUtils.Simulate.change(nameInput);

            const expectedCallbackArgs = {
                name: 'Another value',
                price: props.price
            };

            expect(props.changeProduct.called).to.eql(true);
            expect(props.changeProduct.lastCall.args[0]).to.eql(expectedCallbackArgs);
        });

        it(`should call changeProduct on price change`, () => {

            const {props, component} = setup();

            const priceInput = TestUtils.findRenderedDOMComponentWithClass(
                component,
                'Product__price-input'
            );

            priceInput.value = '110';

            TestUtils.Simulate.change(priceInput);

            const expectedCallbackArgs = {
                name: props.name,
                price: '110'
            };

            expect(props.changeProduct.called).to.eql(true);
            expect(props.changeProduct.lastCall.args[0]).to.eql(expectedCallbackArgs);

        });

    });


});