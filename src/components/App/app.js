import React from 'react'
import BudgetBar from '../BudgetBar/budget-bar.js'
import PersonItem from '../PersonItem/person-item.js'

import './app.less'

export default class App extends React.Component {

    render() {
        return (
            <div className="App">
                <BudgetBar />
                <PersonItem />
            </div>
        );
    }

}