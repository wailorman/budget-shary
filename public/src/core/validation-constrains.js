const validate = require('validate.js');

const product = {
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

export {
    product
};