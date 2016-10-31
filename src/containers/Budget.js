import React from 'react';

import {STUB_BUDGET_ID} from '../core/state-sync';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Product from '../components/Product';
import Person from '../components/Person';
import ValidationErrorsList from '../components/ValidationErrorsList';
import TransactionsList from '../components/TransactionsList';
import BudgetName from '../components/BudgetName';
import ParticipatingRow from '../components/ParticipatingRow';
import NewProductButton from '../components/NewProductButton';

import {getProductsByPersonId} from '../core/components-utils';

import * as actionCreators from '../actions';


export function BudgetComponent ({state, dispatch}) {

    const actions = bindActionCreators(actionCreators, dispatch);

    return (
        <div>

            <BudgetName name={state.budget.name}
                        onChange={actions.changeBudgetProps.bind(null)} />

            {_.map(state.persons, (person)=> {


                const ownProducts = getProductsByPersonId(person.id, state.products);
                const ownProductsIds = _.map(ownProducts, 'id');


                const ownErrors = _.get(state, `errors.persons[${person.id}]`, {});
                const ownProductsErrors = _.chain(state.errors.products).pick(ownProductsIds).value();


                return (

                    <Person
                        key={person.id}
                        name={person.name}
                        share={person.share}
                        validationErrors={ownErrors}

                        onChange={actions.changePerson.bind(null, person.id)}
                        onRemove={actions.removePerson.bind(null, person.id)}
                    >

                        {_.map(ownProductsIds, (productId)=>(

                            <Product
                                key={productId}
                                name={state.products[productId].name}
                                price={state.products[productId].price}
                                validationErrors={ownProductsErrors[productId]}

                                onChange={actions.changeProduct.bind(null, productId)}
                                onRemove={actions.removeProduct.bind(null, productId)}
                            >
                                
                                <ParticipatingRow
                                    productParticipatingElem={state.productParticipating ? state.productParticipating[productId] || {} : {}}
                                    onClick={actions.toggleParticipation.bind(null, productId)}
                                    persons={state.persons}
                                />
                                
                            </Product>

                        ))}

                        <NewProductButton onClick={actions.newProduct.bind(null, person.id)} />

                    </Person>

                );

            })}

            <button onClick={actions.newPerson}>{"New person"}</button>

            <ValidationErrorsList errors={state.errors.common}/>

            <br /><br />

            <button onClick={actions.realizeInterchange}>Calculate</button>

            <TransactionsList transactions={state.transactions}/>

        </div>
    );
}

BudgetComponent.propTypes = {
    state: React.PropTypes.object.isRequired,
    dispatch: React.PropTypes.func.isRequired
};

class Budget extends React.Component {

    componentDidMount(){

        const budgetIdToFetch = this.props.params.id || STUB_BUDGET_ID;

        this.props.dispatch(actionCreators.fetchBudget(budgetIdToFetch));
    }

    render() {
        return (<BudgetComponent {...this.props} />);
    }

}

Budget.propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    params: React.PropTypes.object
};

export default connect(
    (state)=> {
        return {state};
    },
    (dispatch)=> {
        return {dispatch};
    }
)(Budget);
