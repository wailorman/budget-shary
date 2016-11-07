import '../styles/NewProductButton.css';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';

export const NewProductButton = (props)=> {

    const onClick = ()=> { props.onClick(); };

    return (
        <div className="NewProductButton">

            <FlatButton
                onClick={onClick}
                label="New product"
                icon={<FontIcon className="material-icons">add</FontIcon>}
            />

        </div>
    );

};

NewProductButton.propTypes = {
    onClick: React.PropTypes.func
};

export default NewProductButton;