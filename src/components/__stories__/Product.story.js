import {storiesOf, action} from '@kadira/storybook';
import {Product} from '../Product'
import {storyGenerator} from '../../../test/helpers/storybook-helper'

const callbacks = {
    onChange: action('onChange'),
    onRemove: action('onRemove')
};

const story = storyGenerator(Product, callbacks);

storiesOf('Product')
    .add('name & price', () => {
        const props = {
            name: 'Milk',
            price: '20'
        };

        return story(props, "Should display normal product Milk 20");
    })
    .add('name, price & validation errors', ()=> {
        const props = {
            name: 'Milk',
            price: '-55',
            validationErrors: {
                price: [
                    'Price must be greater than or equal to 0'
                ]
            }
        };

        return story(props, `Should display error "Price must be greater than or equal to 0"`);
    });