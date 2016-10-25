import Budget from './containers/Budget';
import store from './store';
import {Provider} from 'react-redux';

ReactDOM.render(
    <Provider store={store}>
        <Budget />
    </Provider>,
    document.getElementById('app')
);