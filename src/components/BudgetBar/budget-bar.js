import React from 'react'

export default class BudgetBar extends React.Component {

    render() {
        return (
            <div className="BudgetBar">
                <div className="BudgetBar__budget-name">
                    <input type="text"
                           placeholder="Budget name"/>
                </div>
                <div className="BudgetBar__change-budget">
                    <button type="button">Change</button>
                </div>
            </div>
        );
    }

}