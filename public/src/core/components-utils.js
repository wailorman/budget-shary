export const getProductsByPersonId = function (personId, products) {

    return _.filter(
        products,
        (product) => product.ownerId == personId
    );

};