import ParticipatingSwitcher from './ParticipatingSwitcher';
import '../styles/ParticipatingRow.css';

import * as definedPropTypes from '../reducers/prop-types';

export const ParticipatingRow = (props)=> {

    return (
        <div className="ParticipatingRow">

            {_.map(props.persons, (person)=> {

                const switcherState = props.productParticipatingElem[person.id] || false;

                return person.name ? (
                    <ParticipatingSwitcher
                        key={person.id}
                        personName={person.name}
                        state={switcherState}
                        onClick={props.onClick.bind(null, person.id)}
                    />
                ) : null;
                
            })}

        </div>
    );

};

ParticipatingRow.propTypes = {
    onClick: React.PropTypes.func.isRequired,
    persons: definedPropTypes.persons,
    productParticipatingElem: definedPropTypes.productParticipatingElem
};

export default ParticipatingRow;