export const getProductsByPersonId = function (personId, products) {

    return _.filter(
        products,
        (product) => product.ownerId == personId
    );

};

export const getFlatValidationErrors = function (validationErrorsObject = {}) {

    const allMessagesArray = _(validationErrorsObject).values().compact().value();
    return _.flatten(allMessagesArray);

};