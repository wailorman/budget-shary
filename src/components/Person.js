import * as definedPropTypes from '../reducers/prop-types';

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';

import '../styles/Person.css';

export const Person = (props)=> {

    const onChange = (propName)=>(event) => {

        const newValue = event.target.value;

        const isChangedName = propName == 'name';
        const isChangedShare = propName == 'share';

        const name = isChangedName ? newValue : props.name;
        const share = isChangedShare ? newValue : props.share;

        props.onChange({name, share});

    };

    const onRemove = ()=> {
        props.onRemove();
    };

    return (
        <div className="Person">

            <div className="Person__inputs">

                <TextField
                    className="Person__name-input"
                    hintText="Name"
                    value={props.name}
                    onChange={onChange('name')}
                    errorText={_.get(props, 'validationErrors.name', []).join(', ')}
                />

                <TextField
                    style={{
                        width: 150
                    }}
                    className="Person__share-input"
                    hintText="Share"
                    value={props.share}
                    onChange={onChange('share')}
                    errorText={_.get(props, 'validationErrors.share', []).join(', ')}
                />

                %

                &nbsp;

                <FlatButton
                    className="Person__remove-button"
                    onClick={onRemove}
                    icon={<FontIcon className="material-icons">clear</FontIcon>}

                    style={{
                        minWidth: 40
                    }}
                />

            </div>

            {props.children}

        </div>

    );
};

Person.propTypes = {
    name: React.PropTypes.string,
    share: definedPropTypes.numberOrString,
    validationErrors: React.PropTypes.object,

    onChange: React.PropTypes.func.isRequired,
    onRemove: React.PropTypes.func.isRequired,
    children: React.PropTypes.any
};

export default Person;