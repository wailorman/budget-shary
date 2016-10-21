import ParticipatingSwitcher from './ParticipatingSwitcher'
import '../styles/ParticipatingRow.css'

export const ParticipatingRow = (props)=> {

    return (
        <div className="ParticipatingRow">

            {_.map(props.persons, (person)=> {

                return (
                    <ParticipatingSwitcher
                        key={person.id}
                        personName={person.name}
                        onClick={props.onClick.bind(null, person.id)}
                    />
                );
                
            })}

        </div>
    );

};

ParticipatingRow.PropTypes = {
    onClick: React.PropTypes.func.isRequired,
    persons: React.PropTypes.object             // todo: Describe shape of persons state
};

export default ParticipatingRow;