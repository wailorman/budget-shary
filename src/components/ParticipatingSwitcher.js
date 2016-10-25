import '../styles/ParticipatingSwitcher.css';

export const ParticipatingSwitcher = (props)=> {

    const onClick = ()=> {
        props.onClick();
    };

    const buttonStyle = {
        fontWeight: props.state ? 'bold' : 'normal',
        backgroundColor: props.state ? 'gray' : ''
    };

    return (
        <div className="ParticipatingSwitcher">

            <button
                style={buttonStyle}
                title={props.personName}
                onClick={onClick}>


                {props.personName}
            </button>

        </div>
    );
    
};

ParticipatingSwitcher.propTypes = {
    personName: React.PropTypes.string,
    onClick: React.PropTypes.func.isRequired,
    state: React.PropTypes.bool
};

export default ParticipatingSwitcher;