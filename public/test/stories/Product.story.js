import {storiesOf, action} from '@kadira/storybook';
import {Product} from '../../src/components/Product'
import {ProductsList} from '../../src/containers/ProductsList'
import {generateStore} from '../../src/store'
import {normalizedFakeState} from '../fixtures/fake-state'
import {Provider} from 'react-redux'

const callbacks = {
    onChange: action('onChange'),
    onRemove: action('onRemove')
};

const getProduct = (props)=> {

    _.defaults(props, {callbacks});

    return (
        <Product {...props}/>
    );
};

storiesOf('Product')
    .add('name & price', () => {
        const props = {
            name: 'Milk',
            price: '20'
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
            }
        };
        return getProduct(props);
    });