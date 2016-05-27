import * as constrains from '../core/validation-constrains'

const validateJs = require('validate.js');

export const validateCollection = function (collection, constrains) {

    const result = {};

    _(collection).each((object)=> {
        // todo: throw error if ID isn't defined
        result[object.id] = validateJs(object, constrains);
    });

    return result;
    
};

export const validate = function (state, deps = {}) {

    // for mocking
    _.defaults(deps, {validateCollection, validateJs});
    
    const persons = deps.validateCollection(state.persons, constrains.person); 
    const products = deps.validateCollection(state.products, constrains.product);
    const common = deps.validateJs(state.common, constrains.common);
    
    return {
        persons,
        products,
        common
    };
    
};