import ValidationErrorsList from './ValidationErrorsList'

export const Product = (props)=> {

    const onChange = (event) => {

        const initiatorClassName = event.target.className;

        const name = initiatorClassName == 'Product__name-input' ?
            event.target.value : props.name;

        const price = initiatorClassName == 'Product__price-input' ?
            event.target.value : props.price;

        props.onChange({name, price});

    };

    const onRemove = ()=> {
        props.onRemove();
    };

    return (
        <div className="Product">

            <ValidationErrorsList errors={props.validationErrors}/>

            <input
                className="Product__name-input"
                size="17"
                type="text"
                value={props.name}
                onChange={onChange}
            />

            <input
                className="Product__price-input"
                size="5"
                type="text"
                value={props.price}
                onChange={onChange}
            />

            <button className="Product__remove-button" onClick={onRemove}>
                x
            </button>
        </div>
    );
};

Product.propTypes = {
    id: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]).isRequired,
    name: React.PropTypes.string,
    price: React.PropTypes.string,
    onChange: React.PropTypes.func.isRequired,
    onRemove: React.PropTypes.func.isRequired,
    validationErrors: React.PropTypes.object
};

export default Product;