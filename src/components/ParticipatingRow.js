import ParticipatingSwitcher from './ParticipatingSwitcher';
import '../styles/ParticipatingRow.css';

export const ParticipatingRow = (props)=> {

    return (
        <div className="ParticipatingRow">

            {_.map(props.persons, (person)=> {

                const switcherState = props.productParticipatingElem[person.id] || false;

                return (
                    <ParticipatingSwitcher
                        key={person.id}
                        personName={person.name}
                        state={switcherState}
                        onClick={props.onClick.bind(null, person.id)}
                    />
                );
                
            })}

        </div>
    );

};

ParticipatingRow.PropTypes = {
    onClick: React.PropTypes.func.isRequired,
    persons: React.PropTypes.object,                    // todo: Describe shape of persons state
    productParticipatingElem: React.PropTypes.object
};

export default ParticipatingRow;