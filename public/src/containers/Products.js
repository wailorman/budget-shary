import Product from '../components/Product'
import { removeProduct } from '../actions'
import { store } from '../store'

const ProductsList = React.createClass({

    propTypes: {
        actions: React.PropTypes.object,
        products: React.PropTypes.object
    },

    render: function () {

        let products = [];
        _.transform(this.props.products, (result, product, id)=> {
            products.push(
                <Product
                    key={id}
                    id={id}
                    name={product.name}
                    price={product.price}
                    onRemove={this.props.actions.removeProduct}
                />
            );
        });

        return (
            <div>
                {products}
            </div>
        );
    }
});

export default ProductsList;