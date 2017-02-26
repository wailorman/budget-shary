import {connect} from 'react-redux';
import {pure} from 'recompose';

import ParticipatingSwitcher from './ParticipatingSwitcher';

import '../styles/ParticipatingRow.css';

import {toggleParticipation} from '../actions';

import {productParticipatingSelector} from '../selectors/participating';


@connect(
    (state, {productId}) => {
        return {
            participating: productParticipatingSelector(productId)(state)
        };
    },
    (dispatch, {productId}) => {
        return {
            onClick: (personId) => () =>
                dispatch(toggleParticipation(productId, personId))
        };
    }
)
@pure
export default class ParticipatingRow extends React.Component {

    static propTypes = {
        onClick: React.PropTypes.func.isRequired,
        participating: React.PropTypes.array,
        productId: React.PropTypes.string
    }

    render() {

        const props = this.props;

        return (
            <div className="ParticipatingRow">

                {this.props.participating.map(([personId, personName, state]) => {

                    return personName ?
                        (
                            <ParticipatingSwitcher
                                key={personId}
                                label={personName}
                                enabled={state}
                                onClick={props.onClick(personId)}
                            />
                        )
                        :
                        null;

                })}

            </div>
        );

    }

}
