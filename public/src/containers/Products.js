import Product from '../components/Product'

const ProductsList = React.createClass({

    getInitialState(){
        return {
            products: {
                1: {
                    id: 1, name: 'Water', price: '120'
                },
                2: {
                    id: 2, name: 'Potatoes', price: '50'
                }
            }
        };
    },

    onRemove(id){
        delete this.state.products[id];
    },

    render: function () {

        let products = [];
        _.transform(this.state.products, (result, product, id)=> {
            products.push(
                <Product key={id} id={id} name={product.name} price={product.price} onRemove={this.onRemove.call()}/>
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