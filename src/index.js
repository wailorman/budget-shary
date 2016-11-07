import Budget from './containers/BudgetContainer';
import BudgetsListContainer from './containers/BudgetsListContainer';
import {store, history} from './store';
import {Provider} from 'react-redux';
import {Router, Route} from 'react-router';

import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();


ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider>
            <div>
                <AppBar
                    style={{
                        backgroundColor: '#3F51B5'
                    }}
                    title={
                        "Title"
                    }
                />

                <Router history={history}>
                    <Route path="/" component={BudgetsListContainer}/>
                    <Route path="/budgets/:id" component={Budget}/>
                </Router>
            </div>
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('app')
);