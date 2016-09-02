import {CHANGE_PERSON, CHANGE_PRODUCT} from '../actions'
import * as constrains from '../core/validation-constrains'

const validateJs = require('validate.js');


export const validationMiddleware = (store) => (next) => (action) => {

    let newAction = _.cloneDeep(action);

    if (action.type == CHANGE_PRODUCT) {

        const product = {
            id: action.id,
            ...action.values
        };

        const validationResult = validateJs(product, constrains.product);

        // is invalid
        if (validationResult){
            _.set(newAction, `meta.errors.products.${action.id}`, validationResult);
        }

    }

    if (action.type == CHANGE_PERSON) {

        const person = {
            id: action.id,
            ...action.values
        };

        const validationResult = validateJs(person, constrains.person);

        // is invalid
        if (validationResult){
            _.set(newAction, `meta.errors.persons.${action.id}`, validationResult);
        }

    }

    return next(newAction);
};

export default validationMiddleware;