import Product from '../components/Product'
import Products from './Products'
import { bindActionCreators } from 'redux'

import * as actionCreators from '../actions'
import store from '../store'

const App = React.createClass({

    componentWillMount() {
        store.subscribe(()=> {
            this.setState(store.getState());
        });
    },

    render: function () {
        return (
            <div>
                <Products
                    actions={bindActionCreators(actionCreators, store.dispatch)}
                    products={store.getState().products}
                />
            </div>
        );
    }
});

export default App;