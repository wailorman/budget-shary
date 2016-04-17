import Product from '../components/Product'
import Products from './Products'
import { bindActionCreators } from 'redux'
import PersonContainer from './PersonContainer'

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

        const personContainersList = this.state.persons.map((person)=> {

            const ownProducts = _.filter(
                this.state.products,
                (product) => product.ownerId == person.id
            );

            const actions = bindActionCreators(actionCreators, store.dispatch);

            const personContainerProps = {
                key: person.id,

                ...person,
                ownProducts,
                ...actions
            };

            return (
                <PersonContainer {... personContainerProps} />
            );

        });

        return (
            <div>
                {personContainersList}
            </div>
        );
    }
});

export default App;