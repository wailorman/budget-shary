import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import ParticipatingSwitcher from './ParticipatingSwitcher';

import '../styles/ParticipatingRow.css';

import * as definedPropTypes from '../reducers/prop-types';
import {toggleParticipation} from '../actions';


@connect(
    (state, {productId}) => {
        return {
            productParticipatingElem: _.get(state, `productParticipating[${productId}]`, {}),
            persons: state.persons // todo: Get only ids & names
        };
    },
    (dispatch, {productId}) => {
        return {
            onClick: (personId) => () =>
                bindActionCreators(toggleParticipation, dispatch)(productId, personId)
        };
    }
)
export class ParticipatingRow extends React.Component {

    render() {

        const props = this.props;

        return (
            <div className="ParticipatingRow">

                {_.map(props.persons, (person) => {

                    const switcherState = props.productParticipatingElem[person.id] || false;

                    return person.name ?
                        (
                            <ParticipatingSwitcher
                                key={person.id}
                                personName={person.name}
                                state={switcherState}
                                onClick={props.onClick(person.id)}
                            />
                        )
                        :
                        null;

                })}

            </div>
        );

    }

    static propTypes = {
        onClick: React.PropTypes.func,
        persons: definedPropTypes.persons,
        productParticipatingElem: definedPropTypes.productParticipatingElem,

        productId: definedPropTypes.id
    }

}

export default ParticipatingRow;