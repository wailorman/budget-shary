const validate = function (state, deps = {}) {

    // for mocking
    _.defaults(deps, {validatePersons, validateProducts});
    
    let result = {};

    const personsValidationResult = deps.validatePersons(state.persons);
    const productsValidationResult = deps.validateProducts(state.products);

    return _.mergeWith(result, personsValidationResult, productsValidationResult, (objVal, srcVal)=> {

        // _.merge() can't correctly merge object with array values (to merge their arrays)
        if (_.isArray(objVal)) {
            return objVal.concat(srcVal);
        }

    });

};

const trimObjectFromEmptyArrays = function (object) {

    let clonedObj = _.cloneDeep(object);

    _.forIn(object, (value, key)=> {
        if (value instanceof Array && value.length == 0){
            delete clonedObj[key];
        }
    });

    return clonedObj;

};

const validateOnePerson = function (person) {

    let errors = {
        id: [],
        name: [],
        share: [],
        common: []
    };

    if (_.isEmpty(person)) {
        return errors;
    }

    if (person.id) {

        if (typeof person.id != 'string') {
            errors.id.push(`ID should be a string. Got ${typeof person.id} instead`);
        }

    } else {
        errors.id.push(`ID missing`);
    }

    if (person.name || person.name === '') {

        if (typeof person.name != 'string') {
            errors.name.push(`Name should be a string. Got ${typeof person.id} instead`);
        }

    } else {
        errors.name.push(`Name missing`);
    }

    if (person.share) {

        if (!person.share.match(/^[1-9]\d*(\.\d+)?$/)) {
            errors.share.push(`Share allows only digits & dots`);
        }

    } else {
        errors.share.push(`Share missing`);
    }

    return errors;

};

const validatePersons = function (persons = []) {

    let sumOfShares = 0;
    let errors = {
        persons: [],
        common: []
    };

    if (_.isEmpty(persons)) {
        return errors;
    }

    // properties validating
    errors.persons = persons.map((prsn)=> {

        return validateOnePerson(prsn);

    });

    // share validating
    persons.forEach((prsn)=> {

        sumOfShares += parseInt(prsn.share);

    });

    if (sumOfShares != 100) {
        errors.common.push(`Sum of shares should be equal to 100. Got ${sumOfShares} instead`);
    }

    return errors;

};

const validateProducts = function (products, deps = {}) {

    // for mocking
    _.defaults(deps, {validateProductName, validateProductPrice});

    return {
        products: _.chain(products).map((product) => deps.validateOneProduct(product)).flatten().value(),
        common: []
    };

};

// todo: product ID validation

const validateOneProduct = function (product, deps = {}) {

    // for mocking
    _.defaults(deps, {validateProductName, validateProductPrice});
    
    return {
        name: deps.validateProductName(product.name),
        price: deps.validateProductPrice(product.price)
    };
    
};

const validateProductName = function (name) {

    let result = [];

    if (typeof name != 'string') {
        result.push(`Product name can be only a string. Got ${typeof name} instead`);
    }

    return result;
    
};

/**
 *
 * @param {string || number} price
 * @returns {Array}
 */
const validateProductPrice = function (price) {

    let result = [];

    let priceInt = parseInt(price);

    if (typeof price != 'string' && typeof price != 'number'){
        result.push(`Price can be only String or Number. Got ${typeof price} instead`);
    }

    if (typeof price == 'string' && !price.match(/^[1-9]\d*(\.\d+)?$/)) {
        result.push(`Price allows only digits & dots`);
    }

    if (priceInt < 0){
        result.push(`Price allows only positive numbers and zero`);
    }

    return result;

};

export {
    validate,
    validatePersons,
    validateProducts,
    validateOnePerson,
    trimObjectFromEmptyArrays,
    validateOneProduct,
    validateProductPrice,
    validateProductName
};
export default validate;