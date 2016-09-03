import {CHANGE_PERSON, CHANGE_PRODUCT} from '../actions'
import * as constrains from '../core/validation-constrains'

const validateJs = require('validate.js');


export const validationMiddleware = (store) => (next) => (action) => {

    // todo: It will be better if whole state will be validated, not by parts

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

        const personsValidationResult = validateJs(person, constrains.person);

        // is invalid
        if (personsValidationResult){
            _.set(newAction, `meta.errors.persons.${action.id}`, personsValidationResult);
        }

        if (action.meta && action.meta.newShareSum){

            const shareSum = {shareSum: action.meta.newShareSum};
            const validationConstrains = {shareSum: constrains.common.shareSum};
            
            const shareSumValidationResult = validateJs(shareSum, validationConstrains);

            // is invalid
            if (shareSumValidationResult) {
                _.set(newAction, `meta.errors.common.shareSum`, shareSumValidationResult.shareSum);
            }
            
        }

    }

    return next(newAction);
};

export default validationMiddleware;