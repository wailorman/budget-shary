import React from 'react'
import BudgetBar from '../BudgetBar'
import PersonItem from '../PersonItem'

import './App.less'

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