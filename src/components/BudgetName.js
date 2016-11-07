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
                inputStyle={{
                    fontSize: '1.5rem',
                    textAlign: 'center',
                    fontWeight: '400'
                }}
                hintText="Budget name"
                value={props.name || ''}
                onChange={onChange}
                fullWidth={true}
            />
            
        </div>
    );
    
};

BudgetName.propTypes = {
    onChange: React.PropTypes.func.isRequired,
    name: React.PropTypes.string
};

export default BudgetName;