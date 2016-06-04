import {storiesOf, action} from '@kadira/storybook';
import Product from '../../src/components/Product'

const callbacks = {
    onChange: action('onChange'),
    onRemove: action('onRemove')
};

const getProduct = (props)=> {
    return (
        <Product {...props}/>
    );
};

storiesOf('Product')
    .add('name & price', () => {
        const props = {
            name: 'Milk',
            price: '20',
            ...callbacks
        };

        return getProduct(props);
    })
    .add('name, price & validation errors', ()=> {
        const props = {
            name: 'Milk',
            price: '-55',
            validationErrors: {
                price: [
                    'Price must be greater than or equal to 0'
                ]
            },
            ...callbacks
        };
        return getProduct(props);
    });