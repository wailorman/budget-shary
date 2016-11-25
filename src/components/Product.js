import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';

import {changeProduct, removeProduct} from '../actions';

import "../styles/Product.css";


@connect(
    (state, {id}) => {

        const product = _.get(state, `products[${id}]`, {});
        const validationErrors = _.get(state, `errors.products[${product.id}]`, null);

        return {
            ...product,
            validationErrors
        };
    },
    (dispatch, {id}) => ({
        onChange: bindActionCreators(changeProduct, dispatch).bind(null, id),
        onRemove: bindActionCreators(removeProduct, dispatch).bind(null, id)
    })
)
export class Product extends React.Component {

    shouldComponentUpdate(nextProps) {

        const shouldUpdate =    this.props.name !== nextProps.name ||
                                this.props.price !== nextProps.price ||
                                this.props.validationErrors !== nextProps.validationErrors;

        return shouldUpdate;
    }

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

    static propTypes = {
        id: React.PropTypes.string,
        name: React.PropTypes.string,
        price: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number
        ]),
        validationErrors: React.PropTypes.object,
        children: React.PropTypes.any
    }

}

export default Product;