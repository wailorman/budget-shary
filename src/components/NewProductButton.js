import '../styles/NewProductButton.css';
import RaisedButton from 'material-ui/RaisedButton';

export const NewProductButton = (props)=> {

    const onClick = ()=> { props.onClick(); };

    return (
        <div className="NewProductButton">

            <RaisedButton onClick={onClick} label="New product"/>

        </div>
    );

};

NewProductButton.propTypes = {
    onClick: React.PropTypes.func
};

export default NewProductButton;