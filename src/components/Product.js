import ValidationErrorsList from "./ValidationErrorsList";
import * as definedPropTypes from '../reducers/prop-types';

import "../styles/Product.css";

export const Product = (props)=> {

    const onChange = (event) => {

        const initiatorClassName = event.target.className;
        const newValue = event.target.value;

        const isChangedName = initiatorClassName == 'Product__name-input';
        const isChangedPrice = initiatorClassName == 'Product__price-input';


        const name = isChangedName ? newValue : props.name;
        const price = isChangedPrice ? newValue : props.price;

        props.onChange({name, price});

    };

    const onRemove = ()=> {
        props.onRemove();
    };

    return (
        <div className="Product">

            <ValidationErrorsList errors={props.validationErrors}/>

            <input
                className="Product__name-input"
                size="17"
                type="text"
                value={props.name}
                onChange={onChange}
            />

            <input
                className="Product__price-input"
                size="5"
                type="text"
                value={props.price}
                onChange={onChange}
            />

            <button className="Product__remove-button" onClick={onRemove}>
                x
            </button>
            
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