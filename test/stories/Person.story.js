import { storiesOf, action } from '@kadira/storybook';
import Person from '../../../src/components/Person'
import { changePerson, removePerson } from '../../../src/actions'
import {storyGenerator} from '../../../test/helpers/storybook-helper'

const callbacks = {
    onChange: action('onChange'),
    onRemove: action('onRemove')
};

const story = storyGenerator(Person, callbacks);

storiesOf('Person', module)
    .add('with name & share', () => {

        const props = {
            name: 'Mike',
            share: '55'
        };

        return story(props, "Should display normal person Mike 55");
    })
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

        return story(props, "Should display 4 errors");
    });