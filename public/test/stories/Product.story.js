import { storiesOf, action } from '@kadira/storybook';
import Product from '../../src/components/Product'
import { changeProduct, removeProduct } from '../../src/actions'

const callbacks = {
    changeProduct: action(changeProduct('1')),
    removeProduct: action(removeProduct('1'))
};

storiesOf('Product', module)
    .add('with name & price', () => {
        const props = {
            name: 'Milk',
            price: '20',
            ...callbacks
        };

        return (<Product {...props}/>);
    })
    .add('with validation errors (direct)', ()=> {
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
        return (<Product {...props}/>);
    });