import React from 'react'

export default class EventBar extends React.Component {

    render() {
        return (
            <div className="EventBar">
                <div className="EventBar__event-name">
                    <input type="text"
                           placeholder="Event name"/>
                </div>
                <div className="EventBar__change-event">
                    <button type="button">Change</button>
                </div>
            </div>
        );
    }

}