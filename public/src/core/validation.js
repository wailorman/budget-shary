const validate = function (state) {

    let result = {};

    const personsValidationResult = validatePersons(state.persons);

    return _.merge(result, personsValidationResult);

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

const validateProducts = function (products) {

};

export {
    validate,
    validatePersons,
    validateProducts,
    validateOnePerson,
    trimObjectFromEmptyArrays
};
export default validate;