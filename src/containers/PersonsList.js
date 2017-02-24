import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {newPerson} from '../actions';

import ProductsList from '../containers/ProductsList';
import Person from '../components/Person/Person';

import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';

@connect(
    (state) => ({
        persons: state.persons
    }),
    (dispatch) => ({
        onNewPerson: bindActionCreators(newPerson, dispatch)
    }),
    (stateProps, dispatchProps)=>{
        return Object.assign({}, stateProps, dispatchProps);
    }
)
export class PersonsList extends React.Component {
    render() {

        return (
            <div className="PersonsList">
                {_.map(this.props.persons, (person) => {

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

    static propTypes = {
        persons: React.PropTypes.object,
        onNewPerson: React.PropTypes.func
    }
}

export default PersonsList;