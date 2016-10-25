import Person from '../../../src/components/Person';
import { removePerson } from '../actions';
import { store } from '../store';

const Persons = React.createClass({

    propTypes: {
        actions: React.PropTypes.object,
        persons: React.PropTypes.array
    },

    render: function () {

        let persons = _.map(this.props.persons, (person)=> {
            const personRefName = `person_${person.id}`;
            return (
                <Person
                    ref={personRefName}
                    key={person.id}
                    id={person.id}
                    name={person.name}
                    share={person.share}
                    onRemove={this.props.actions.removePerson}
                    onChange={this.props.actions.changePerson}
                />
            );
        });

        return (
            <div className="Persons">
                {persons}
                <button className="Persons__new-person" onClick={this.props.actions.newPerson}>
                    New person
                </button>
            </div>
        );
    }
});

export default Persons;