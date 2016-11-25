import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {getProductsByPersonId} from '../core/components-utils';

import {newProduct} from '../actions';

import Product from '../components/Product';
import ParticipatingRow from '../components/ParticipatingRow';
import NewProductButton from '../components/NewProductButton';

@connect(
    (state, {ownerId}) => {

        const ownProducts = getProductsByPersonId(ownerId, state.products);
        const ownProductsIds = _.map(ownProducts, 'id');

        return {
            productsIds: ownProductsIds
        };
    },
    (dispatch, {ownerId})=> {

        return {
            onNewProductClick: bindActionCreators(newProduct, dispatch).bind(null, ownerId)
        };

    },
    (stateProps, dispatchProps)=>{
        return Object.assign({}, stateProps, dispatchProps);
    }
)
export class ProductsList extends React.Component {

    render() {

        return (
            <div className="ProductsList">
                {_.map(this.props.productsIds, (productId) => (

                    <Product
                        key={productId}
                        id={productId}
                    >

                        <ParticipatingRow
                            productId={productId}
                        />

                    </Product>

                ))}

                <NewProductButton onClick={this.props.onNewProductClick}/>

            </div>
        );

    }

    static propTypes = {
        ownerId: React.PropTypes.string,
        onNewProductClick: React.PropTypes.func,

        productsIds: React.PropTypes.arrayOf(
            React.PropTypes.string
        )
    }

}

export default ProductsList;