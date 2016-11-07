import * as definedPropTypes from '../reducers/prop-types';

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

import "../styles/Product.css";

export const Product = (props)=> {

    const onChange = (propName)=>(event) => {

        const newValue = event.target.value;

        const isChangedName = propName == 'name';
        const isChangedPrice = propName == 'price';


        const name = isChangedName ? newValue : props.name;
        const price = isChangedPrice ? newValue : props.price;

        props.onChange({name, price});

    };

    const onRemove = ()=> {
        props.onRemove();
    };

    return (
        <div className="Product">

            <TextField
                style={{
                    fontSize: '0.95rem',
                    width: 160
                }}
                className="Product__name-input"
                hintText="Name"
                value={props.name}
                onChange={onChange('name')}
                errorText={_.get(props, 'validationErrors.name', []).join(', ')}
            />

            <TextField
                style={{
                    fontSize: '0.95rem',
                    width: 130
                }}
                className="Product__price-input"
                hintText="Price"
                value={props.price}
                onChange={onChange('price')}
                errorText={_.get(props, 'validationErrors.price', []).join(', ')}
            />

            &nbsp;

            <FlatButton
                className="Product__remove-button"
                onClick={onRemove}
                label="X"
                backgroundColor="#f1f1f1"
                style={{
                    fontSize: '0.95rem',
                    minWidth: 15
                }}
            />
            
            {props.children}
        </div>
    );
};

Product.propTypes = {
    name: React.PropTypes.string,
    price: definedPropTypes.numberOrString,
    validationErrors: React.PropTypes.object,

    onChange: React.PropTypes.func.isRequired,
    onRemove: React.PropTypes.func.isRequired,
    children: React.PropTypes.any
};

export default Product;