import '../styles/BudgetName.css';

export const BudgetName = (props)=> {

    const onChange = (event)=> {

        const name = event.target.value;

        props.onChange({name});

    };

    return (
        <div className="BudgetName">

            <input type="text"
                   className="BudgetName__input"
                   placeholder="Budget name"
                   value={props.name || ''}
                   onChange={onChange}/>
            
        </div>
    );
    
};

BudgetName.propTypes = {
    onChange: React.PropTypes.func.isRequired,
    name: React.PropTypes.string
};

export default BudgetName;