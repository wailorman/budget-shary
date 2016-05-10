const validate = function () {

};

const validateOnePerson = function (person) {

    if (_.isEmpty(person)) {
        return undefined;
    }

    let errors = [];

    if (person.id) {

        if (typeof person.id != 'string') {
            errors.push(`ID should be a string. Got ${typeof person.id} instead`);
        }

    } else {
        errors.push(`ID missing`);
    }

    if (person.name || person.name === '') {

        if (typeof person.name != 'string') {
            errors.push(`Name should be a string. Got ${typeof person.id} instead`);
        }

    } else {
        errors.push(`Name missing`);
    }

    if (person.share) {

        if (!person.share.match(/^[1-9]\d*(\.\d+)?$/)) {
            errors.push(`Share allows only digits & dots`);
        }

    } else {
        errors.push(`Share missing`);
    }

    return errors;

};

const validatePersons = function (persons = []) {

    if (_.isEmpty(persons)) {
        return undefined;
    }

    let sumOfShares = 0;
    let errors = [];

    // properties validating
    persons.forEach((prsn, index)=> {

        if (prsn.id) {

            if (typeof prsn.id != 'string') {
                errors.push(`Person #${index}: ID should be a string. Got ${typeof prsn.id} instead`);
            }

        } else {
            errors.push(`Person #${index}: ID missing`);
        }

        if (prsn.name || prsn.name === '') {

            if (typeof prsn.name != 'string') {
                errors.push(`Person #${index}: Name should be a string. Got ${typeof prsn.id} instead`);
            }

        } else {
            errors.push(`Person #${index}: Name missing`);
        }

        if (prsn.share) {

            if (!prsn.share.match(/^[1-9]\d*(\.\d+)?$/)) {
                errors.push(`Person #${index}: Share allows only digits & dots`);
            }

        } else {
            errors.push(`Person #${index}: Share missing`);
        }

    });

    // share validating
    persons.forEach((prsn)=> {

        sumOfShares += parseInt(prsn.share);

    });

    if (sumOfShares != 100) {
        errors.push(`Sum of shares should be equal to 100. Got ${sumOfShares} instead`);
    }

    return errors;

};

const validateProducts = function (products) {

};

export { validatePersons, validateProducts, validateOnePerson };
export default validate;