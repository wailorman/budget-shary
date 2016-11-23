import * as definedPropTypes from '../reducers/prop-types';

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';

import "../styles/Product.css";

export class Product extends React.Component {

    render() {

        const props = this.props;

        const onChange = (propName) => (event) => {

            const newValue = event.target.value;

            const isChangedName = propName == 'name';
            const isChangedPrice = propName == 'price';


            const name = isChangedName ? newValue : props.name;
            const price = isChangedPrice ? newValue : props.price;

            props.onChange({name, price});

        };

        const onRemove = () => {
            props.onRemove();
        };

        return (
            <div className="Product">

                <div className="Product__inputs-and-participating">

                    <div className="Product__participating">

                        {props.children}

                    </div>

                    <div className="Product__inputs">

                        <TextField
                            style={{
                                fontSize: '0.95rem',
                                width: null
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
                                width: null
                            }}
                            className="Product__price-input"
                            hintText="Price"
                            value={props.price}
                            onChange={onChange('price')}
                            errorText={_.get(props, 'validationErrors.price', []).join(', ')}
                        />

                    </div>

                </div>

                <FlatButton


                    className="Product__remove-button"
                    onClick={onRemove}
                    icon={<FontIcon className="material-icons">clear</FontIcon>}

                    style={{
                        minWidth: 40
                    }}
                />

            </div>
        );
    }
}

Product.propTypes = {
    name: React.PropTypes.string,
    price: definedPropTypes.numberOrString,
    validationErrors: React.PropTypes.object,

    onChange: React.PropTypes.func.isRequired,
    onRemove: React.PropTypes.func.isRequired,
    children: React.PropTypes.any
};

export default Product;