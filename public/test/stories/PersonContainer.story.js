import {storiesOf, action} from '@kadira/storybook';
import PersonContainer from '../../src/containers/PersonContainer'

const getPersonContainer = function (props = {}) {

    _.defaults(props, {
        id: '1',
        name: 'Jane',
        share: '0',

        changePerson: action('person changed'),
        removePerson: action('person removed'),

        changeProduct: action('product changed'),
        removeProduct: action('product removed'),
        newProduct: action('product added')
    });

    return (
        <PersonContainer {...props}/>
    );
};

storiesOf('PersonContainer')
    .add('with default props', ()=> (
        <PersonContainer />
    ))
    .add('person w/out products', ()=> {
        return getPersonContainer();
    })
    .add('person with 2 product', ()=> {
        return getPersonContainer({
            ownProducts: [
                {id: 'prod1', name: 'Banana',     price: '45',    ownerId: '1'},
                {id: 'prod2', name: 'Tomato',     price: '234',   ownerId: '1'}
            ]
        });
    });