const Dispatcher = require('../dispatcher/dispatcher');
const actionNames = require('../constants/action-names');

module.exports = {

    update(newAttrs) {

        Dispatcher.dispatch({
            eventName: actionNames.budget.update,
            attributes: newAttrs
        });

    }

};