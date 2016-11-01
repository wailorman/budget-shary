import BudgetListElem from './BudgetsListElem';

const budgetsList = {
    _b_1: {
        id: '_b_1',
        name: 'First budget'
    },
    stub: {
        id: 'stub',
        name: 'Second budget'
    },
    _b_3: {
        id: '_b_3',
        name: 'Third budget'
    }
};

export const BudgetsList = ()=> {

    return (
        <div className="BudgetsList">

            {_.map(budgetsList, (budget)=> {

                return (
                    <BudgetListElem
                        key={budget.id}
                        {...budget}
                    />
                );

            })}

        </div>
    );

};

export default BudgetsList;