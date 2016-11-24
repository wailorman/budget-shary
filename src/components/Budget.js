import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import '../styles/Budget.css';

import Product from './Product';
import Person from './Person';
import ValidationErrorsList from './ValidationErrorsList';
import TransactionsList from './TransactionsList';
import BudgetName from './BudgetName';
import ParticipatingRow from './ParticipatingRow';
import NewProductButton from './NewProductButton';

import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';

import {getProductsByPersonId} from '../core/components-utils';

import * as actionCreators from '../actions';
import {STUB_BUDGET_ID} from '../state-stub';


@connect(
    (state)=> {
        return {state};
    },
    (dispatch)=> {
        return {
            dispatch,
            fetchBudget: bindActionCreators(actionCreators.fetchBudget, dispatch)
        };
    }
)
export class Budget extends React.Component {

    componentDidMount(){

        const budgetIdToFetch = this.props.params.id || STUB_BUDGET_ID;

        this.props.fetchBudget(budgetIdToFetch);
    }

    render() {

        const {state, dispatch} = this.props;

        const actions = bindActionCreators(actionCreators, dispatch);

        return (
            <div className="Budget">

                <BudgetName name={state.budget.name}
                            onChange={actions.changeBudgetProps.bind(null)}/>

                {_.map(state.persons, (person) => {


                    const ownProducts = getProductsByPersonId(person.id, state.products);
                    const ownProductsIds = _.map(ownProducts, 'id');


                    return (

                        <Person
                            key={person.id}
                            id={person.id}
                        >

                            {_.map(ownProductsIds, (productId) => (

                                <Product
                                    key={productId}
                                    id={productId}
                                >

                                    <ParticipatingRow
                                        productParticipatingElem={state.productParticipating ? state.productParticipating[productId] || {} : {}}
                                        onClick={actions.toggleParticipation.bind(null, productId)}
                                        persons={state.persons}
                                    />

                                </Product>

                            ))}

                            <NewProductButton onClick={actions.newProduct.bind(null, person.id)}/>

                        </Person>

                    );

                })}

                <RaisedButton
                    backgroundColor="#294E6B"
                    labelColor="white"
                    onClick={actions.newPerson}
                    icon={<FontIcon className="material-icons">add</FontIcon>}
                    label="New person"
                />

                <ValidationErrorsList errors={state.errors.common}/>

                <br /><br />

                <RaisedButton
                    backgroundColor="#009688"
                    labelColor='white'
                    onClick={actions.realizeInterchange}
                    label="Calculate" fullWidth={true}
                />

                <TransactionsList/>

            </div>
        );
    }

    static propTypes = {
        state: React.PropTypes.object.isRequired,
        dispatch: React.PropTypes.func.isRequired,
        params: React.PropTypes.object,

        fetchBudget: React.PropTypes.func
    }

}

export default Budget;