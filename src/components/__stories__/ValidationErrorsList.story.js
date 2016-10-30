import { storiesOf, action } from '@kadira/storybook';
import ValidationErrorsList from '../ValidationErrorsList'

storiesOf('ValidationErrorsList', module)
    .add('empty', () => {
        const props = {
        };

        return (<ValidationErrorsList {...props}/>);
    })
    .add('with errors', ()=> {
        const props = {
            errors: {
                name: ['Name is invalid'],
                price: [
                    'Price must be greater than or equal to 0'
                ]
            }
        };
        return (<ValidationErrorsList {...props}/>);
    });