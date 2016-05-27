const validate = require('validate.js');

const id = {
    presence: true,
    length: {
        minimum: 1
    }
};
    

const product = {
    id,
    name: {
        length: {
            minimum: 0,
            maximum: 255,
            message: {
                notValid: 'should be a string'
            }
        }
    },
    price: {
        numericality: {
            greaterThanOrEqualTo: 0
        }
    }
};

const person = {
    id,
    name: {
        presence: true
    },
    share: {
        presence: true,
        numericality: {
            greaterThanOrEqualTo: 0,
            lessThanOrEqualTo: 100,
            message: 'must satisfy expression 0 <= x <= 100'
        }
    }
};

const common = {
    shareSum: {
        numericality: {
            equalTo: 100,
            message: '^Share sum should be equal to 100, not %{value}'
        }
    }
};

const allConstrains = {
    persons: person,
    products: product,
    common
};

export {
    id,
    product,
    person,
    common,
    allConstrains
};

export default allConstrains;