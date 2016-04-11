import Product from '../components/Product'
import { removeProduct } from '../actions'
import { store } from '../store'

const Products = React.createClass({

    propTypes: {
        actions: React.PropTypes.object,
        products: React.PropTypes.array
    },

    render: function () {

        let products = _.map(this.props.products, (product)=> {
            const productRefName = `product_${product.id}`;
            return (
                <Product
                    ref={productRefName}
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    onRemove={this.props.actions.removeProduct}
                    onChange={this.props.actions.changeProduct}
                />
            );
        });

        return (
            <div>
                {products}
                <button className="Products__new-product" onClick={this.props.actions.newProduct}>
                    New product
                </button>
            </div>
        );
    }
});

export default Products;