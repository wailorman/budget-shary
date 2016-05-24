import Person from '../components/Person'
import Product from '../components/Product'

import '../styles/PersonContainer.css'

export const PersonContainer = React.createClass({

    propTypes: {
        id: React.PropTypes.string.isRequired,
        name: React.PropTypes.string.isRequired,
        share: React.PropTypes.string.isRequired,

        ownProducts: React.PropTypes.arrayOf(React.PropTypes.object),

        personErrors: React.PropTypes.object,
        productsErrors: React.PropTypes.array,

        changePerson: React.PropTypes.func.isRequired,
        removePerson: React.PropTypes.func.isRequired,

        changeProduct: React.PropTypes.func.isRequired,
        removeProduct: React.PropTypes.func.isRequired,
        newProduct: React.PropTypes.func.isRequired
    },

    getDefaultProps(){
        return {
            id: '',
            name: '',
            share: '',
            
            ownProducts: [],
            
            personErrors: {},
            productsErrors: [],
            
            changePerson(){},
            removePerson(){},
            
            changeProduct(){},
            removeProduct(){},
            newProduct(){}
        };
    },
    
    onNewProductClick(){

        const personId = this.props.id;

        this.props.newProduct(personId);
    },

    render() {

        const personProps = {
            name: this.props.name,
            share: this.props.share,
            changePerson: this.props.changePerson.bind(null, this.props.id),
            removePerson: this.props.removePerson.bind(null, this.props.id)
        };

        const productsList = this.props.ownProducts.map((product)=> {

            const productProps = {
                key: product.id,

                ...product,
                changeProduct: this.props.changeProduct.bind(null, product.id),
                removeProduct: this.props.removeProduct.bind(null, product.id)
            };

            return (
                <Product {... productProps} />
            );

        });

        return (
            <div className="PersonContainer">

                <Person {... personProps} />
                <div className="Products">

                    { productsList }

                    <button
                        className="Products__new-product"
                        onClick={this.onNewProductClick}
                    >
                        New product
                    </button>


                </div>


            </div>
        );
    }
});

export default PersonContainer;