import React from 'react'

import './BudgetBar.less'

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