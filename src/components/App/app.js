import React from 'react'
import EventBar from '../EventBar/event-bar.js'
import PersonItem from '../PersonItem/person-item.js'

export default class App extends React.Component {

    render() {
        return (
            <div className="App">
                <EventBar />
                <PersonItem />
            </div>
        );
    }

}