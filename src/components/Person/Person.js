import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';

import { changePerson, removePerson } from '../../actions';

import '../../styles/Person.css';

import {onePersonSelector} from '../../selectors/persons';
import {personErrorsSelector} from '../../selectors/errors';

@connect(
    (state, {id}) => {

        const person = onePersonSelector(id)(state);
        const validationErrors = personErrorsSelector(id)(state);

        return {
            ...person,
            validationErrors
        };
    },
    (dispatch, {id}) => ({
        onChange: bindActionCreators(changePerson, dispatch).bind(null, id),
        onRemove: bindActionCreators(removePerson, dispatch).bind(null, id)
    })
)
export class Person extends React.Component {

    static propTypes = {
        id: React.PropTypes.string,


        name: React.PropTypes.string,
        share: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number
        ]),
        validationErrors: React.PropTypes.object,


        children: React.PropTypes.any
    }

    // shouldComponentUpdate(nextProps) {
    //     const shouldUpdate =    this.props.name !== nextProps.name ||
    //                             this.props.share !== nextProps.share ||
    //                             this.props.validationErrors !== nextProps.validationErrors;
    //
    //     return shouldUpdate;
    // }

    render() {

        const props = this.props;

        const onChange = (propName) => (event) => {

            const newValue = event.target.value;

            const isChangedName = propName == 'name';
            const isChangedShare = propName == 'share';

            const name = isChangedName ? newValue : props.name;
            const share = isChangedShare ? newValue : props.share;

            props.onChange({name, share});

        };

        const onRemove = () => {
            props.onRemove();
        };

        return (
            <div className="Person">

                <div className="Person__inputs">

                    <TextField
                        style={{
                            width: null
                        }}
                        className="Person__name-input"
                        hintText="Name"
                        value={props.name}
                        onChange={onChange('name')}
                        errorText={_.get(props, 'validationErrors.name', []).join(', ')}
                    />

                    <TextField
                        style={{
                            width: null
                        }}
                        className="Person__share-input"
                        hintText="Share"
                        value={props.share}
                        onChange={onChange('share')}
                        errorText={_.get(props, 'validationErrors.share', []).join(', ')}
                    />

                    <div className="Person__percent-sign">

                        %

                    </div>

                    <FlatButton
                        className="Person__remove-button"
                        onClick={onRemove}
                        icon={<FontIcon className="material-icons">clear</FontIcon>}

                        style={{
                            minWidth: 40,
                            maxWidth: 45
                        }}
                    />

                </div>

                {props.children}

            </div>

        );
    }

}

export default Person;
