import { bindActionCreators } from 'redux'
import PersonContainer from './PersonContainer'
import TransactionsList from '../components/TransactionsList'
import {ValidationErrorsList} from '../components/ValidationErrorsList'


import {getProductsByPersonId} from '../core/components-utils'

import * as actionCreators from '../actions'
import store from '../store'

const App = React.createClass({

    componentWillMount() {
        this.setState(store.getState());

        store.subscribe(()=> {
            this.setState(store.getState());
        });
    },

    render: function () {

        const actions = bindActionCreators(actionCreators, store.dispatch);

        const transactions = this.state.transactions;

        const commonErrors = _.get(this.state, 'errors.common', {});

        const personContainersList = _.map(this.state.persons, (person)=> {

            const ownProducts = getProductsByPersonId(person.id, this.state.products);
            const ownProductsIds = _.map(ownProducts, 'id');

            const personErrors = _.get(this.state.errors, `persons[${person.id}]`, {});

            const productsErrors = _.chain(this.state.errors)
                .get(`products`, {})
                .pick(ownProductsIds)
                .value();

            return (
                <PersonContainer
                    key={person.id}
                    ownProducts={ownProducts}

                    personErrors={personErrors}
                    productsErrors={productsErrors}

                    {... person}
                    {... actions}
                />
            );

        });

        return (
            <div>
                {personContainersList}
                <button onClick={actions.newPerson}>New person</button>

                <ValidationErrorsList errors={commonErrors}/>
                
                <br />
                <br />
                
                <button onClick={actions.realizeInterchange}>Calculate</button>
                <TransactionsList transactions={transactions} />
            </div>
        );
    }
});

export default App;