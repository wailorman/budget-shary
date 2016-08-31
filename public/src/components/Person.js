import ValidationErrorsList from './ValidationErrorsList'

import '../styles/Person.css'

export const Person = (props)=> {

    const onChange = (event) => {

        const initiatorClassName = event.target.className;
        const newValue = event.target.value;

        const isChangedName = initiatorClassName == 'Person__name-input';
        const isChangedShare = initiatorClassName == 'Person__share-input';

        const name = isChangedName ? newValue : props.name;
        const share = isChangedShare ? newValue : props.share;

        props.onChange({name, share});

    };

    const onRemove = ()=> {
        props.onRemove();
    };
    
    return (
        <div className="Person">

            <ValidationErrorsList errors={props.validationErrors}/>

            <input
                className="Person__name-input"
                type="text"
                placeholder="Name"
                value={props.name}
                onChange={onChange}
            />

            <input
                className="Person__share-input"
                size="3"
                type="text"
                placeholder="Share"
                value={props.share}
                onChange={onChange}
            />%

            &nbsp;
            <button className="Person__remove-button" onClick={onRemove}>
                x
            </button>

            <br/>

            {props.children}

        </div>

    );
};

Person.propTypes = {
    name: React.PropTypes.string,
    share: React.PropTypes.string,
    validationErrors: React.PropTypes.object,

    onChange: React.PropTypes.func.isRequired,
    onRemove: React.PropTypes.func.isRequired
};

export default Person;