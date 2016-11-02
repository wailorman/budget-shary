import {Link} from 'react-router';

export const BudgetsListElem = ({id, name})=> {

    return (
        <div className="BudgetsListElem">

            <Link to={`/budgets/${id}`}>{name||'Unnamed budget'}</Link>

        </div>
    );

};

BudgetsListElem.propTypes = {
    id: React.PropTypes.oneOfType([
        React.PropTypes.number, React.PropTypes.string
    ]),
    name: React.PropTypes.string
};

export default BudgetsListElem;