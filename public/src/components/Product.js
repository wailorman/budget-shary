import ValidationErrorsList from './ValidationErrorsList'

const Product = React.createClass({
    propTypes: {
        name: React.PropTypes.string,
        price: React.PropTypes.string,
        changeProduct: React.PropTypes.func,
        removeProduct: React.PropTypes.func
    },

    onChange(event){

        const targetClassName = event.target.className;

        const name = targetClassName == 'Product__name-input' ? event.target.value : this.props.name;
        const price = targetClassName == 'Product__price-input' ? event.target.value : this.props.price;

        // Product__name-input
        // Product__price-input

        this.props.changeProduct({name, price});

    },

    onRemoveClick(){
        this.props.removeProduct();
    },

    render: function () {
        return (
            <div className="Product">

                <ValidationErrorsList errors={this.props.validationErrors} />

                <input
                    className="Product__name-input"
                    size="17"
                    type="text"
                    ref="name"
                    value={this.props.name}
                    onChange={this.onChange}
                />

                <input
                    className="Product__price-input"
                    size="5"
                    type="text"
                    ref="price"
                    value={this.props.price}
                    onChange={this.onChange}
                />

                <button className="Product__remove-button" onClick={this.onRemoveClick}>
                    x
                </button>
            </div>
        );
    }
});

export default Product;
