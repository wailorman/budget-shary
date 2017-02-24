import AppBar from 'material-ui/AppBar';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';

import {getLabel} from '../selectors/topbar';
import {getPath} from '../selectors/router';

import packageInfo from '../../package.json';

@connect(
    (state) => ({
        path: getPath(state),
        label: getLabel(state)
    }),
    (dispatch) => ({
        goToIndex: () => dispatch(push('/'))
    }),
    (stateProps, dispatchProps)=>{
        return Object.assign({}, stateProps, dispatchProps);
    }
)
export class TopBar extends React.Component {

    render() {

        let label = "";

        const isIndexPage = this.props.path == '/';
        const isBudgetPage = (/budgets/).test(this.props.path);

        if (isIndexPage) {
            label = (<VersionLabel version={packageInfo.version} />);
        } else if (isBudgetPage) {
            label = this.props.label;
        }

        const backIcon = (
            <IconButton
                onClick={this.props.goToIndex}
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
        label: React.PropTypes.string,

        goToIndex: React.PropTypes.func
    };

}

const VersionLabel = ({version}) => (

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
            {"v" + version}
        </span>

    </span>

);

VersionLabel.propTypes = {
    version: React.PropTypes.string
};

export default TopBar;
