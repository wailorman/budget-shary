import { bindActionCreators } from 'redux'
import PersonContainer from './PersonContainer'
import TransactionsList from '../components/TransactionsList'

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

        const personContainersList = this.state.persons.map((person)=> {

            const ownProducts = _.filter(
                this.state.products,
                (product) => product.ownerId == person.id
            );

            const personContainerProps = {
                key: person.id,

                ...person,
                ownProducts,
                ...actions
            };

            return (
                <PersonContainer key={person.id} {... personContainerProps} />
            );

        });

        return (
            <div>
                {personContainersList}
                <button onClick={actions.newPerson}>New person</button>
                <br />
                <button onClick={actions.realizeInterchange}>Calculate</button>
                <TransactionsList transactions={transactions} />
            </div>
        );
    }
});

export default App;