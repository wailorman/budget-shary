import * as constrains from 'validation-constrains'

const validateJs = require('validate.js');

export const validateCollection = function (collection, constrains) {

    const result = {};

    _(collection).each((object)=> {
        // todo: throw error if ID isn't defined
        const validationResult = validateJs(object, constrains);

        // is not valid
        if (validationResult) {
            result[object.id] = validationResult;
        }
    });

    return _.isEmpty(result) ? undefined : result;
    
};

export const validate = function (state, deps = {}) {

    // for mocking
    _.defaults(deps, {validateCollection, validateJs});
    
    const persons = deps.validateCollection(state.persons, constrains.person); 
    const products = deps.validateCollection(state.products, constrains.product);
    const common = deps.validateJs(state.common, constrains.common);

    const result = {};

    // if .persons have validation errors
    if (persons) result.persons = persons; // attach errors to the result
    if (products) result.products = products;
    if (common) result.common = common;

    return result;
    
};