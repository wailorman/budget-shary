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

    render: function () {

        let products = [];
        _.transform(this.state.products, function (result, product, id) {
            products.push(
                <Product key={id} id={id} name={product.name} price={product.price}/>
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