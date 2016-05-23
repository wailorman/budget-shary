import { storiesOf, action } from '@kadira/storybook';
import Person from '../../src/components/Person'
import { changePerson, removePerson } from '../../src/actions'

const callbacks = {
    changePerson: action(changePerson('1')),
    removePerson: action(removePerson('1'))
};

storiesOf('Person', module)
    .add('with name & share', () => (
        <Person name="Mike" share="55" {...callbacks}/>
    ))
    .add('with validation errors (direct)', ()=> {
        const props = {
            name: 'Mike',
            share: '55',
            validationErrors: {
                id: ['ID missing'],
                name: ['Name is invalid'],
                share: [
                    'Share should be between 0..100',
                    'Share should contain only digits and dots'
                ]
            }
        };
        return (<Person {...props} {...callbacks}/>);
    });