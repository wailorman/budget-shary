import AppBar from 'material-ui/AppBar';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';

import packageInfo from '../../package.json';

@connect(
    (state) => ({
        path: state.routing.locationBeforeTransitions.pathname,
        budget: state.budget

    }),
    (dispatch) => ({dispatch})
)
export class TopBar extends React.Component {

    render() {

        const {path, budget, dispatch} = this.props;

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

    }

    static propTypes = {
        path: React.PropTypes.string,
        budget: React.PropTypes.object,
        dispatch: React.PropTypes.func
    };

}

export default TopBar;

