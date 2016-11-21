import {Link} from 'react-router';
import {ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import IconMenu from 'material-ui/IconMenu';
import FontIcon from 'material-ui/FontIcon';
import MenuItem from 'material-ui/MenuItem';

import '../styles/BudgetsListElem.css';

export const BudgetsListElem = ({id, name, onRemove})=> {

    const randomColor = getRandomColor();

    const nameFirstSymbol = (name[0] || 'B').toUpperCase();

    const rightIcon = (
        <FontIcon className="material-icons">more_vert</FontIcon>
    );

    const rightIconMenu = (
        <IconMenu iconButtonElement={rightIcon}>
            <MenuItem onClick={onRemove}>Delete</MenuItem>
        </IconMenu>
    );

    return (
        <ListItem
            className="BudgetsListElem"
            leftAvatar={
                <Avatar
                    backgroundColor={randomColor}
                >
                    {nameFirstSymbol}
                </Avatar>
            }
            primaryText={
                <Link to={`/budgets/${id}`}>{name||'Unnamed budget'}</Link>
            }
            rightIconButton={rightIconMenu}
            secondaryText="Jan 9, 2014"
        />

    );

};


function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// <button onClick={onRemove}>x</button>

BudgetsListElem.propTypes = {
    id: React.PropTypes.oneOfType([
        React.PropTypes.number, React.PropTypes.string
    ]),
    name: React.PropTypes.string,
    onRemove: React.PropTypes.func.isRequired
};

export default BudgetsListElem;