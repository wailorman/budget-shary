const Dispatcher = require('../dispatcher/dispatcher');
const actionNames = require('../constants/action-names');

module.exports = {

    create(personsCollection) {

        Dispatcher.dispatch({
            eventName: actionNames.person.create,
            collection: personsCollection
        });

    }

};