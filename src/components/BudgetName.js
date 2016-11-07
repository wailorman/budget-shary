import '../styles/BudgetName.css';
import TextField from 'material-ui/TextField';

export const BudgetName = (props)=> {

    const onChange = (event)=> {

        const name = event.target.value;

        props.onChange({name});

    };

    return (
        <div className="BudgetName">

            <TextField
                hintText="Budget name"
                value={props.name || ''}
                onChange={onChange}
            />
            
        </div>
    );
    
};

BudgetName.propTypes = {
    onChange: React.PropTypes.func.isRequired,
    name: React.PropTypes.string
};

export default BudgetName;