import {bindActionCreators} from 'redux';

import '../styles/Budget.css';

import Product from './Product';
import Person from './Person';
import ValidationErrorsList from './ValidationErrorsList';
import TransactionsList from './TransactionsList';
import BudgetName from './BudgetName';
import ParticipatingRow from './ParticipatingRow';
import NewProductButton from './NewProductButton';

import RaisedButton from 'material-ui/RaisedButton';

import {getProductsByPersonId} from '../core/components-utils';

import * as actionCreators from '../actions';


export function Budget ({state, dispatch}) {

    const actions = bindActionCreators(actionCreators, dispatch);

    return (
        <div className="Budget">

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

            <RaisedButton
                primary={true}
                onClick={actions.newPerson}
                label="New person"
            />

            <ValidationErrorsList errors={state.errors.common}/>

            <br /><br />

            <button onClick={actions.realizeInterchange}>Calculate</button>

            <TransactionsList transactions={state.transactions}/>

        </div>
    );
}

Budget.propTypes = {
    state: React.PropTypes.object.isRequired,
    dispatch: React.PropTypes.func.isRequired
};

export default Budget;