import '../styles/ParticipatingSwitcher.css';

import RaisedButton from 'material-ui/RaisedButton';

export const ParticipatingSwitcher = (props)=> {

    const onClick = ()=> {
        props.onClick();
    };

    return (
        <div className="ParticipatingSwitcher">

            <RaisedButton
                backgroundColor={props.enabled ? "#00BCD4" : "#E7E8E9"}

                labelStyle={{
                    color: props.enabled ? 'white' : null
                }}
                primary={props.enabled}
                onTouchTap={onClick}
                style={{
                    minWidth: '100%',
                    boxShadow: 'none'
                }}
                label={props.label}
            />

        </div>
    );

};

ParticipatingSwitcher.propTypes = {
    label: React.PropTypes.string,
    onClick: React.PropTypes.func.isRequired,
    enabled: React.PropTypes.bool
};

export default ParticipatingSwitcher;
