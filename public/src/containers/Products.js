import Product from '../components/Product'
import { removeProduct } from '../actions'
import { store } from '../store'

const ProductsList = React.createClass({

    propTypes: {
        actions: React.PropTypes.object,
        products: React.PropTypes.array
    },

    render: function () {

        let products = _.map(this.props.products, (product)=> {
            return (
                <Product
                    key={product.id}
                    id={product.id}
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