import React, {Component} from 'react'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import Product from '../components/Product'
import Person from '../components/Person'
import ValidationErrorsList from '../components/ValidationErrorsList'
import TransactionsList from '../components/TransactionsList'

import {getProductsByPersonId} from '../core/components-utils'

import * as actionCreators from '../actions'


export const BudgetComponent = ({state, dispatch}) => {

    const actions = bindActionCreators(actionCreators, dispatch);

    return (
        <div>

            {_.map(state.persons, (person)=> {


                const ownProducts = getProductsByPersonId(person.id, state.products);
                const ownProductsIds = _.map(ownProducts, 'id');


                const ownErrors = state.errors.persons[person.id];
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

                        {_.map(ownProductsIds, (id)=>(

                            <Product
                                key={id}
                                name={state.products[id].name}
                                price={state.products[id].price}
                                validationErrors={ownProductsErrors[id]}

                                onChange={actions.changeProduct.bind(null, id)}
                                onRemove={actions.removeProduct.bind(null, id)}
                            />

                        ))}

                    </Person>

                );

            })}

            <button onClick={actions.newPerson}>New person</button>

            <ValidationErrorsList errors={state.errors.common}/>

            <br /><br />

            <button onClick={actions.realizeInterchange}>Calculate</button>

            <TransactionsList transactions={state.transactions}/>

        </div>
    );
};

class Budget extends React.Component {

    render() {
        return (<BudgetComponent {...this.props} />);
    }
}

export default connect(
    (state)=> {
        return {state};
    },
    (dispatch)=> {
        return {dispatch};
    }
)(Budget);
