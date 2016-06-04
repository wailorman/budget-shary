import {Product} from '../components/Product'
import {ProductContainer} from './ProductContainer'
import {connect} from 'react-redux'

export const ProductsList = (props)=> {

    const products = _.map(props.productsIds, (productId)=> {
        return (
            <ProductContainer key={productId} id={productId} />
        );
    });

    return (
        <div className="ProductsList">
            {products}
        </div>
    );

};

ProductsList.propTypes = {
    // todo: Should get Person's ID prop type
    ownerId: Product.propTypes.id,
    productsIds: React.PropTypes.arrayOf(
        Product.propTypes.id
    ).isRequired
};

export default connect()(ProductsList);