import Product from '../components/Product'
import Products from './Products'
import { bindActionCreators } from 'redux'

import * as actionCreators from '../actions'
import store from '../store'

const App = React.createClass({
    render: function () {
        return (
            <div>
                <Products actions={bindActionCreators(actionCreators, store.dispatch)} />
            </div>
        );
    }
});

export default App;