import {Link} from 'react-router';

export const BudgetsListElem = ({id, name, onRemove})=> {

    return (
        <div className="BudgetsListElem">

            <Link to={`/budgets/${id}`}>{name||'Unnamed budget'}</Link>
            <button onClick={onRemove}>x</button>

        </div>
    );

};

BudgetsListElem.propTypes = {
    id: React.PropTypes.oneOfType([
        React.PropTypes.number, React.PropTypes.string
    ]),
    name: React.PropTypes.string,
    onRemove: React.PropTypes.func.isRequired
};

export default BudgetsListElem;