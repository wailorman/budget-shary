import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {newPerson} from '../actions';
import {personsListSelector} from '../selectors/persons';

import ProductsList from '../containers/ProductsList';
import Person from '../components/Person/Person';

import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';

@connect(
    (state) => ({
        persons: personsListSelector(state)
    }),
    (dispatch) => ({
        onNewPerson: bindActionCreators(newPerson, dispatch)
    }),
    (stateProps, dispatchProps)=>{
        return Object.assign({}, stateProps, dispatchProps);
    }
)
export class PersonsList extends React.Component {
    static propTypes = {
        persons: React.PropTypes.array,
        onNewPerson: React.PropTypes.func
    }

    render() {

        return (
            <div className="PersonsList">
                {this.props.persons.map((person) => {

                    return (

                        <Person
                            key={person.id}
                            id={person.id}
                        >

                            <ProductsList ownerId={person.id}/>

                        </Person>

                    );

                })}

                <RaisedButton
                    backgroundColor="#294E6B"
                    labelColor="white"
                    onClick={this.props.onNewPerson}
                    icon={<FontIcon className="material-icons">add</FontIcon>}
                    label="New person"
                />

            </div>
        );

    }
}

export default PersonsList;
