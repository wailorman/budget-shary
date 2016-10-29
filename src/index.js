import Budget from './containers/Budget';
import {store, history} from './store';
import {Provider} from 'react-redux';
import {Router, Route} from 'react-router';

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={Budget} />
            <Route path="/budgets/:id" component={Budget} />
        </Router>
    </Provider>,
    document.getElementById('app')
);