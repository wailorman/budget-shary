import Product from '../components/Product'
import {connect} from 'react-redux'
import {changeProduct, removeProduct} from '../actions'

const mapStateToProps = (state, ownProps) => {
    return {
        name: _.get(state, `products[${ownProps.id}].name`),
        price: _.get(state, `products[${ownProps.id}].price`),
        validationErrors: _.get(state, `errors.products[${ownProps.id}]`)
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onChange: (values) => {

            dispatch(
                changeProduct(ownProps.id, values)
            );

        },
        onRemove: ()=> {

            dispatch(
                removeProduct(ownProps.id)
            );

        }
    }
};

export const ProductContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Product);

export default ProductContainer;