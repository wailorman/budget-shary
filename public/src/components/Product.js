const Product = React.createClass({
    propTypes: {
        id: React.PropTypes.any,
        name: React.PropTypes.string,
        price: React.PropTypes.string,
        onChange: React.PropTypes.func,
        onRemove: React.PropTypes.func
    },

    onChange(event){

        const targetClassName = event.target.className;

        const name = targetClassName == 'Product__name-input' ? event.target.value : this.props.name;
        const price = targetClassName == 'Product__price-input' ? event.target.value : this.props.price;

        // Product__name-input
        // Product__price-input

        this.props.onChange(this.props.id, {name, price});

    },

    onRemoveClick(){
        this.props.onRemove(this.props.id);
    },

    render: function () {
        return (
            <div className="Product">
                <input
                    className="Product__name-input"
                    type="text"
                    ref="name"
                    value={this.props.name}
                    onChange={this.onChange}
                />

                <input
                    className="Product__price-input"
                    type="text"
                    ref="price"
                    value={this.props.price}
                    onChange={this.onChange}
                />

                <button className="Product__remove-product" onClick={this.onRemoveClick}>
                    x
                </button>
            </div>
        );
    }
});

export default Product;
