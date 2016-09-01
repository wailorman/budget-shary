export const getProductsByPersonId = function (personId, products) {

    let ownProductsIds = [];

    _.forEach(products, (product, id)=> {
        if (product.ownerId == personId) {
            ownProductsIds.push(id);
        }
    });

    return _.pick(products, ownProductsIds);

};

export const getFlatValidationErrors = function (validationErrorsObject = {}) {

    const allMessagesArray = _(validationErrorsObject).values().compact().value();
    return _.flatten(allMessagesArray);

};