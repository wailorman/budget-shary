import ValidationErrorsList from './ValidationErrorsList'
import {connect} from 'react-redux'
import {changeProduct, removeProduct} from '../actions'

export const Product = (props)=> (
    <div className="Product">

        <ValidationErrorsList errors={props.validationErrors}/>

        <input
            className="Product__name-input"
            size="17"
            type="text"
            ref="name"
            value={props.name}
            onChange={props.onChange}
        />

        <input
            className="Product__price-input"
            size="5"
            type="text"
            ref="price"
            value={props.price}
            onChange={props.onChange}
        />

        <button className="Product__remove-button" onClick={props.onRemove}>
            x
        </button>
    </div>
);

Product.propTypes = {
    id: React.PropTypes.oneOfType(React.PropTypes.string, React.PropTypes.number).isRequired,
    name: React.PropTypes.string,
    price: React.PropTypes.string,
    onChange: React.PropTypes.func.isRequired,
    onRemove: React.PropTypes.func.isRequired,
    validationErrors: React.PropTypes.object
};

export const ProductContainer = connect({
    mapStateToProps: (state, ownProps) => {
        return {
            name: state.products[ownProps.id].name,
            price: state.products[ownProps.id].price
        }
    },
    mapDispatchToProps: (dispatch, ownProps) => {
        return {
            onChange: (event) => {

                const initiatorClassName = event.target.className;

                const name = initiatorClassName == 'Product__name-input' ?
                    event.target.value : ownProps.name;

                const price = initiatorClassName == 'Product__price-input' ?
                    event.target.value : ownProps.price;

                dispatch(
                    changeProduct(ownProps.id, {name, price})
                );

            },
            onRemove: ()=> {

                dispatch(
                    removeProduct(ownProps.id)
                );

            }
        }
    }

})(Product);