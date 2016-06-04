import Product from '../../../../src/components/Product'

describe("UNIT / Components / <Product />", ()=> {

    const defaultProps = {
        name: 'Mike',
        price: '55',

        onChange: sinon.spy(),
        onRemove: sinon.spy()
    };

    const setup = function (props = {}) {

        _.defaultsDeep(props, defaultProps);

        let wrapper = enzyme.shallow(<Product {...props} />);

        return {
            props,
            wrapper
        };
    };

    it(`should display name & price passed to props`, () => {

        const { wrapper } = setup();

        expect(wrapper.find('.Product__name-input').props().value).to.eql('Mike');
        expect(wrapper.find('.Product__price-input').props().value).to.eql('55');

    });

    it(`should call onRemove when X button pressed`, () => {

        const { wrapper, props } = setup();

        wrapper.find('.Product__remove-button').simulate('click');

        expect(props.onRemove.callCount).to.eql(1);

    });

    it(`should display validation errors passed to the props`, () => {

        const props = {
            validationErrors: {
                id: ['ID missing'],
                name: ['Name is invalid'],
                price: [
                    'Price should be >= 0',
                    'Price should contain only digits and dots'
                ]
            }
        };

        const { wrapper } = setup(props);

        const ValidationErrorsListBlock = wrapper.find('ValidationErrorsList');

        expect(ValidationErrorsListBlock.length).to.eql(1);
        expect(ValidationErrorsListBlock.props().errors).to.eql(props.validationErrors);

    });

});