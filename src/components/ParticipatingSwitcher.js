import '../styles/ParticipatingSwitcher.css';

import RaisedButton from 'material-ui/RaisedButton';

export const ParticipatingSwitcher = (props)=> {

    const onClick = ()=> {
        props.onClick();
    };

    return (
        <div className="ParticipatingSwitcher">

            <RaisedButton
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