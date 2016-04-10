const Product = React.createClass({
    propTypes: {
        id: React.PropTypes.any,
        name: React.PropTypes.string,
        price: React.PropTypes.string,
        onChange: React.PropTypes.func,
        onRemove: React.PropTypes.func
    },

    getDefaultProps() {
        return {
            id: null,
            name: "",
            price: "0",
            onChange: ()=> {},
            onRemove: ()=> {}
        };
    },

    getInitialState(){
        return {
            name: this.props.name,
            price: this.props.price
        };
    },

    onNameChange(event){
        const newName = event.target.value;

        this.setState({
            name: newName
        });
    },

    onPriceChange(event){
        const newPrice = event.target.value;

        this.setState({
            price: newPrice
        });
    },

    onRemoveClick(){
        this.props.onRemove(this.props.id);
    },

    render: function () {
        return (
            <div className="Product">
                <input className="Product__name-input" type="text" value={this.state.name} onChange={this.onNameChange}/>
                <input className="Product__name-input" type="text" value={this.state.price} onChange={this.onPriceChange}/>
                <button className="Product__remove-product" onClick={this.onRemoveClick}>x</button>
            </div>
        );
    }
});

export default Product;
