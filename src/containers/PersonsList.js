import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {newPerson} from '../actions';
import {personsIdsSelector} from '../selectors/persons';

import ProductsList from '../containers/ProductsList';
import Person from '../components/Person/Person';

import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';

@connect(
    (state) => ({
        personsIds: personsIdsSelector(state)
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
        personsIds: React.PropTypes.array,
        onNewPerson: React.PropTypes.func
    }

    render() {

        return (
            <div className="PersonsList">

                {this.props.personsIds.map((personId) => {

                    return (

                        <Person
                            key={personId}
                            id={personId}
                            >


                            <ProductsList ownerId={personId}/>


                        </Person>

                    );

                })}

                <RaisedButton
                    backgroundColor="#294E6B"
                    labelColor="white"
                    onClick={this.props.onNewPerson}
                    icon={
                        <FontIcon className="material-icons">add</FontIcon>
                    }
                    label="New person"
                    />


            </div>
        );

    }
}

export default PersonsList;
