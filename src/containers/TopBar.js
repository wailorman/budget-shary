import AppBar from 'material-ui/AppBar';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';

import packageInfo from '../../package.json';

export const TopBar = connect(
    (state) => ({
        path: state.routing.locationBeforeTransitions.pathname,
        budget: state.budget

    }),
    (dispatch) => ({dispatch})
)(({path, budget, dispatch}) => {

    let label = "";

    const state = {budget};

    const isIndexPage = path == '/';
    const isBudgetPage = (/budgets/).test(path);

    if (isIndexPage) {
        label = (
            <span>
                {'Budget Shary '}


                <span
                    style={{
                        font: 'monospaced',
                        fontSize: '0.8rem',
                        opacity: '.6',
                        float: 'right'
                    }}
                >
                    {"v" + packageInfo.version}
                </span>
            </span>
        );
    } else if (isBudgetPage) {
        label = state.budget.name;
    }


    const goToIndex = () => {
        dispatch(push('/'));
    };

    const backIcon = (
        <IconButton
            onClick={goToIndex}
        >
            <FontIcon className="material-icons">
                keyboard_arrow_left
            </FontIcon>
        </IconButton>
    );

    return (
        <AppBar
            iconElementLeft={ isBudgetPage ? backIcon : null }
            style={{
                backgroundColor: '#3F51B5'
            }}
            title={label}
        />
    );

});

export default TopBar;

