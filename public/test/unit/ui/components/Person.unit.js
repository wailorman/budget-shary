import React from 'react'
import { shallow } from 'enzyme';
import Person from '../../../../src/components/Person'

describe("UNIT / Components / <Person />", ()=> {

    const defaultProps = {
        name: 'Mike',
        share: '55',

        changePerson: sinon.spy(),
        removePerson: sinon.spy()
    };

    const setup = function (props = {}) {

        _.defaultsDeep(props, defaultProps);

        let wrapper = shallow(<Person {...props} />);

        return {
            props,
            wrapper
        };
    };

    it(`should display name & share passed to props`, () => {

        const { wrapper } = setup();

        expect(wrapper.find('.Person__name-input').props().value).to.eql('Mike');
        expect(wrapper.find('.Person__share-input').props().value).to.eql('55');

    });

    it(`should call removePerson when X button pressed`, () => {

        const { wrapper, props } = setup();

        wrapper.find('.Person__remove-button').simulate('click');

        expect(props.removePerson.callCount).to.eql(1);

    });

    it(`should display validation errors passed to the props`, () => {

        const props = {
            validationErrors: {
                id: ['ID missing'],
                name: ['Name is invalid'],
                share: [
                    'Share should be between 0..100',
                    'Share should contain only digits and dots'
                ]
            }
        };

        const { wrapper } = setup(props);

        const ValidationErrorsListBlock = wrapper.find('ValidationErrorsList');

        expect(ValidationErrorsListBlock.length).to.eql(1);
        expect(ValidationErrorsListBlock.props().errors).to.eql(props.validationErrors);

    });

});