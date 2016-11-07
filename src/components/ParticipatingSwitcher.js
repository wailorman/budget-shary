import '../styles/ParticipatingSwitcher.css';

import FlatButton from 'material-ui/FlatButton';

export const ParticipatingSwitcher = (props)=> {

    const onClick = ()=> {
        props.onClick();
    };

    return (
        <div className="ParticipatingSwitcher">

            <FlatButton
                backgroundColor={props.state ? "#00BCD4" : null}
                labelStyle={{
                    color: props.state ? 'white' : null
                }}
                primary={props.state}
                onClick={onClick}
                style={{
                    minWidth: 0
                }}
                label={props.personName}
            />

        </div>
    );
    
};

ParticipatingSwitcher.propTypes = {
    personName: React.PropTypes.string,
    onClick: React.PropTypes.func.isRequired,
    state: React.PropTypes.bool
};

export default ParticipatingSwitcher;