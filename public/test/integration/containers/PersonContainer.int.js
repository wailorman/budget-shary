import PersonContainer from '../../../src/containers/PersonContainer'

import { fakeState } from '../../fixtures/fake-state'

describe("INT / Containers / PersonContainer", ()=> {

    const consideringPerson = fakeState.persons[0];
    const consideringPersonProducts = _.filter(
        fakeState.products,
        (product) => product.ownerId == consideringPerson.id
    );

    const setup = function () {
        let props = {
            id: consideringPerson.id,
            name: consideringPerson.name,
            share: consideringPerson.share,

            ownProducts: consideringPersonProducts,

            changePerson: sinon.spy(),
            removePerson: sinon.spy(),

            changeProduct: sinon.spy(),
            removeProduct: sinon.spy(),
            newProduct: sinon.spy()
        };

        let component = TestUtils.renderIntoDocument(<PersonContainer {...props} />);
        let output = ReactDOM.findDOMNode(component);

        return {
            props,
            output,
            component
        };
    };

    describe("render", ()=> {

        it(`person name input should have correct value`, () => {

            const { output } = setup();

            const nameInputValue = $(output).find('.Person__name-input')[0].value;

            expect(nameInputValue).to.eql(consideringPerson.name);

        });

        it(`person share input should have correct value`, () => {

            const { output } = setup();

            const shareInputValue = $(output).find('.Person__share-input')[0].value;

            expect(shareInputValue).to.eql(consideringPerson.share);

        });

        it(`should render 1 own product`, () => {

            const { output } = setup();

            const ownProducts = $(output).find('.Product');

            expect(ownProducts.length).to.eql(1);

        });

        it(`product name & price should be correct`, () => {

            const { output } = setup();

            const name = $(output).find('.Product__name-input')[0].value;
            const price = $(output).find('.Product__price-input')[0].value;

            expect(name).to.eql(consideringPersonProducts[0].name);
            expect(price).to.eql(consideringPersonProducts[0].price);

        });

    });

    describe("change", ()=> {

        describe("product", ()=> {

            it(`should call newProduct`, () => {

                const { output, props } = setup();

                const newProductButton = $(output).find('.Products__new-product')[0];

                TestUtils.Simulate.click(newProductButton);

                expect(props.newProduct.called).to.eql(true);
                expect(props.newProduct.lastCall.args[0]).to.eql(consideringPerson.id);

            });

            it(`should call changeProduct`, () => {

                const { output, props } = setup();

                const productNameInput = $(output).find('.Product__name-input')[0];

                productNameInput.value = 'Another name';

                TestUtils.Simulate.change(productNameInput);

                expect(props.changeProduct.called).to.eql(true);
                expect(props.changeProduct.lastCall.args[0]).to.eql(props.ownProducts[0].id);
                expect(props.changeProduct.lastCall.args[1].name).to.eql('Another name');

            });

        });

        describe("person", ()=> {

            it(`should call changePerson`, () => {

                const { output, props } = setup();

                const personNameInput = $(output).find('.Person__name-input')[0];

                personNameInput.value = 'Another name';

                TestUtils.Simulate.change(personNameInput);

                expect(props.changePerson.called).to.eql(true);
                expect(props.changePerson.lastCall.args[0]).to.eql(consideringPerson.id);
                expect(props.changePerson.lastCall.args[1].name).to.eql('Another name');

            });

        });

    });

    describe("remove", ()=> {

        describe("product", ()=> {

            it(`should call removeProduct`, () => {

                const { output, props } = setup();

                const productRemoveButton = $(output).find('.Product__remove-button')[0];

                TestUtils.Simulate.click(productRemoveButton);

                expect(props.removeProduct.called).to.eql(true);
                expect(props.removeProduct.lastCall.args[0]).to.eql(props.ownProducts[0].id);

            });

        });

        describe("person", ()=> {

            it(`should call removePerson`, () => {

                const { output, props } = setup();

                const personRemoveButton = $(output).find('.Person__remove-button')[0];

                TestUtils.Simulate.click(personRemoveButton);

                expect(props.removePerson.called).to.eql(true);
                expect(props.removePerson.lastCall.args[0]).to.eql(consideringPerson.id);

            });

        });

    });

});