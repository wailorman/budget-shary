import { shallow } from 'enzyme';
import {ValidationErrorsList} from '../ValidationErrorsList';

describe("UNIT / Components / <ValidationErrorsList />", ()=> {

    const setup = function (props = {}) {

        // _.defaultsDeep(props, defaultProps);

        let wrapper = shallow(<ValidationErrorsList {...props} />);

        return {
            props,
            wrapper
        };
    };

    it(`should display validation errors passed to the props`, () => {

        const props = {
            errors: {
                id: ['ID missing'],
                name: ['Name is invalid'],
                share: [
                    'Share should be between 0..100',
                    'Share should contain only digits and dots'
                ]
            }
        };

        const { wrapper } = setup(props);

        const validationErrorsListBlock = wrapper.find('.ValidationErrorsList');

        expect(validationErrorsListBlock.length).to.eql(1);
        expect(validationErrorsListBlock.children().length).to.eql(4);

    });

    it(`should not display anything if errors wasn't passed`, () => {

        const props = {
            errors: undefined
        };

        const { wrapper } = setup(props);

        const validationErrorsListBlock = wrapper.find('.ValidationErrorsList');

        expect(validationErrorsListBlock.length).to.eql(1);
        expect(validationErrorsListBlock.children().length).to.eql(0);

    });
    
});