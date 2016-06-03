import ValidationErrorsList from './ValidationErrorsList'
import {changePerson, removePerson} from '../actions'
import {connect} from 'react-redux'

import '../styles/Person.css'

export const Person = (props)=> (

    <div className="Person">

        <ValidationErrorsList errors={props.validationErrors} />

        <input
            className="Person__name-input"
            type="text"
            ref="name"
            placeholder="Name"
            value={props.name}
            onChange={props.onChange}
        />

        <input
            className="Person__share-input"
            size="3"
            type="text"
            ref="share"
            placeholder="Share"
            value={props.share}
            onChange={props.onChange}
        />%

        &nbsp;
        <button className="Person__remove-button" onClick={props.onRemove}>
            x
        </button>
    </div>
    
);

Person.propTypes = {
    id: React.PropTypes.oneOfType(React.PropTypes.string, React.PropTypes.number).isRequired,
    name: React.PropTypes.string,
    share: React.PropTypes.string,
    onChange: React.PropTypes.func.isRequired,
    onRemove: React.PropTypes.func.isRequired,
    validationErrors: React.PropTypes.object
};

export default connect({
    mapStateToProps: (state, ownProps) => {
        return {
            name: state.persons[ownProps.id].name,
            share: state.persons[ownProps.id].share
        }
    },
    mapDispatchToProps: (dispatch, ownProps) => {
        return {
            onChange: (event) => {

                const initiatorClassName = event.target.className;

                const name = initiatorClassName == 'Person__name-input' ?
                    event.target.value : ownProps.name;

                const share = initiatorClassName == 'Person__share-input' ?
                    event.target.value : ownProps.share;

                dispatch(
                    changePerson(ownProps.id, {name, share})
                );

            },
            onRemove: ()=> {

                dispatch(
                    removePerson(ownProps.id)
                );

            }
        }
    }

})(Person);