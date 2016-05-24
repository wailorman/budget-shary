import * as constrains from '../core/validation-constrains'

const validateJs = require('validate.js');

export const validateCollection = function (collection, constrains) {

    return _(collection).map((object)=> {
        return validateJs(object, constrains);
    }).value();
    
};

export const validate = function (state, deps) {

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