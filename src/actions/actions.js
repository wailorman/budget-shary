const Dispatcher = require('../dispatcher/dispatcher');
const actionNames = require('../constants/action-names');

module.exports = {

    budget: {

        update(model, newAttrs) {

            Dispatcher.dispatch({
                eventName: actionNames.budget.update,
                model: model,
                attributes: newAttrs
            });

        }

    },

    person: {

        create(personsCollection) {

            Dispatcher.dispatch({
                eventName: actionNames.person.create,
                collection: personsCollection
            });

        },

        update(model, newAttrs) {

            Dispatcher.dispatch({
                eventName: actionNames.person.update,
                model: model,
                attributes: newAttrs
            });

        },

        delete(model) {

            Dispatcher.dispatch({
                eventName: actionNames.person.delete,
                model: model
            });

        }

    },

    product: {

        create(productsCollection) {

            Dispatcher.dispatch({
                eventName: actionNames.product.create,
                collection: productsCollection
            });

        },

        update(model, newAttrs) {

            Dispatcher.dispatch({
                eventName: actionNames.product.update,
                model: model,
                attributes: newAttrs
            });

        },

        delete(model) {

            Dispatcher.dispatch({
                eventName: actionNames.product.delete,
                model: model
            });

        }

    }

};