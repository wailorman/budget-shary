import Budget from './containers/BudgetContainer';
import BudgetsListContainer from './containers/BudgetsListContainer';
import {store, history} from './store';
import {Provider} from 'react-redux';
import {Router, Route} from 'react-router';

import './styles/index.css';

import TopBar from './containers/TopBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();


ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider>
            <div>
                <TopBar/>

                <Router history={history}>
                    <Route path="/" component={BudgetsListContainer}/>
                    <Route path="/budgets/:id" component={Budget}/>
                </Router>
            </div>
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('app')
);