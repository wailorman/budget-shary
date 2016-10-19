import './ParticipatingSwitcher'

export const ParticipatingRow = (props)=> {

    return (
        <div className="ParticipatingRow">

            {_.map(props.persons, (person)=> {

                return (
                    <ParticipatingSwitcher 
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