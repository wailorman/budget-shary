import '../styles/ParticipatingSwitcher.css'

export const ParticipatingSwitcher = (props)=> {

    const onClick = ()=> {
        props.onClick();
    };

    return (
        <div className="ParticipatingSwitcher">

            <button 
                title={props.personName}
                onClick={onClick}>
                
                
                { props.status ? 'v' : 'o' }
            </button>

        </div>
    );
    
};

ParticipatingSwitcher.PropTypes = {
    personName: React.PropTypes.string,
    onClick: React.PropTypes.func
};

export default ParticipatingSwitcher;