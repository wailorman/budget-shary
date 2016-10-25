import '../styles/NewProductButton.css';

export const NewProductButton = (props)=> {

    const onClick = ()=> { props.onClick(); };

    return (
        <div className="NewProductButton">

            <button
                onClick={onClick}
            >New product</button>

        </div>
    );

};

NewProductButton.propTypes = {
    onClick: React.PropTypes.func
};

export default NewProductButton;