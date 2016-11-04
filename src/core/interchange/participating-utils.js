/**
 * @typedef {object} ProductParticipatingElemInMonetary
 *
 * @property {boolean} <person id>
 *
 * ```
 * Example of ProductParticipatingElem:
 * {
 *     _person_12: true, <- Person#12 takes part in particular product
 *                          and want to split expenses with Person#50
 *     _person_50: true,
 *
 *     _person_19: false <- But Person#19 doesn't want to split expenses
 *                          with #12 and #50. So he doesn't taking part in
 *                          particular product
 * }
 * ```
 *
 */



/**
 * @typedef {object} ProductParticipatingCollection
 *
 * @property {ProductParticipatingElem} <product id>
 *
 * ```
 * A collection of ProductParticipatingElements
 *
 * Example:
 *
 * {
 *     _product_3: {
 *         _person_12: true,
 *         _person_50: true,
 *         _person_19: false
 *     },
 *     _product_5: {
 *         _person_32: true,
 *         _person_12: false
 *     },
 *     ...
 * }
 * ```
 */



/**
 * @typedef {object} ProductParticipatingCollectionInMonetary
 *
 * @property {ProductParticipatingElemInMonetary} <product id>
 *
 * ```
 * It is a collection of several ProductParticipatingElements
 * for all products in a budget
 *
 * Result of calculation will be like this:
 *
 * {
 *     _product_3: {
 *         _person_12: 50,
 *         _person_50: 50
 *     },
 *     _product_5: {
 *         _person_32: 700
 *     },
 *     ...
 * }
 * ```
 */



/**
 * "Monetary share" is equivalent of "share".
 *
 * The difference is "share" is understood as part in a whole budget (all expenses)
 * and measuring in percents.
 *
 * While "monetary share" is the same, but measuring in money
 *
 * @typedef {number} MonetaryShare
 */

/**
 * Own part in all budget expenses. Measuring in percents (part of number)
 * Examples: 0, 0.5, 0.43, 1
 *
 * @typedef {number} Share
 */

/**
 * Own part in all budget expenses. Measuring in percents
 * Share for humans (or for displaying in state)
 * Examples: 0, 50, 43, 100
 *
 * @typedef {number} StateShare
 */


/**
 * @typedef {object} ProductParticipatingElemInMonetary
 *
 * @property {MonetaryShare} <person id>
 *
 * ```
 * Let's imagine we are splitting expenses between two persons.
 * Particular product costs **100 dollars**
 *
 * So, this ProductParticipatingElem
 *
 * {
 *     _person_12: true,
 *     _person_50: true,
 *     _person_19: false
 * }
 *
 * will convert to this ProductParticipatingElemWithMonetaryShares:
 *
 * {
 *     _person_12: 50,
 *     _person_50: 50
 * }
 *
 * because Person#12 and #50 split the price of this product equally.
 * ```
 */


/**
 * @typedef {object} TotalMonetaryShares
 *
 * @property {MonetaryShare} <person id>
 *
 * ```
 * Example:
 * {
 *     _person_12: 50,
 *     _person_50: 50,
 *     _person_32: 700
 * }
 * ```
 */

/**
 * @typedef {object} Shares
 * ```
 * Example:
 * {
 *     _person_12: 6.25,
 *     _person_50: 6.25,
 *     _person_32: 87.5
 * }
 * ```
 */


/**
 * Calculating total amount or persons who TAKING PART (his value in
 * ProductParticipatingElem == true, not false)
 *
 * @param {ProductParticipatingElemInMonetary} productParticipatingElem
 * @returns {number}
 */
export const productParticipants = function (productParticipatingElem) {

    let amountOfParticipants = 0;

    _.forIn(productParticipatingElem, (participantState)=> {
        if (participantState == true){
            amountOfParticipants++;
        }
    });

    return amountOfParticipants;

};


/**
 * Converts ProductParticipatingElem to ProductParticipatingElemInMonetary
 *
 * @param {ProductParticipatingElemInMonetary} productParticipatingElem
 * @param {number} productPrice
 * @returns {ProductParticipatingElemInMonetary}
 */
export const monetarySharesForProduct = function (productParticipatingElem, productPrice) {

    const amountOfParticipants = productParticipants(productParticipatingElem);

    // All persons split product price equally
    const equalShareForAllParticipants = productPrice / amountOfParticipants;

    let result = {};

    _.forIn(productParticipatingElem, (participantState, productId)=> {

        if (participantState == true) {
            result[productId] = equalShareForAllParticipants;
        }

    });

    return result;

};


/**
 * Converts ProductParticipatingCollection to ProductParticipatingCollectionInMonetary
 *
 * @param {ProductParticipatingCollection} productParticipatingCollection
 * @param {object} products -- Collection of products (picked from budget's state)
 * @returns {ProductParticipatingCollectionInMonetary}
 */
export const monetarySharesForProductsCollection = function (productParticipatingCollection, products) {

    let result = {};

    _.forIn(productParticipatingCollection, (productParticipatingElem, productId)=> {

        // If nonexistent product was meet -- ignore it.
        // Otherwise `products[productId].price` will threw
        // an exception like "Cannot read property 'price' of undefined"
        if (!products[productId]) return true;

        try {
            result[productId] = monetarySharesForProduct(productParticipatingElem, products[productId].price);
        } catch(e) {
            console.error(`Error in calculating participating monetary share for product#${productId}: `, e);
        }

    });

    return result;

};

/**
 * Calculates total monetary shares for each person
 * by summing monetary shares in each ProductParticipatingElemInMonetary
 * throw given collection (ProductParticipatingCollectionInMonetary)
 *
 * @param {ProductParticipatingCollectionInMonetary} participatingCollectionInMonetary
 *
 * @returns {TotalMonetaryShares}
 */
export const totalMonetaryShares = function (participatingCollectionInMonetary) {

    const totalMonetaryShares = {}; // for persons

    _.forIn(participatingCollectionInMonetary, (participatingElem)=> {

        // participatingElem is ProductParticipatingElemInMonetary

        _.forIn(participatingElem, (monetaryShare, personId)=> {

            if ( ! totalMonetaryShares[personId] ) {
                totalMonetaryShares[personId] = 0;
            }
            totalMonetaryShares[personId] += monetaryShare;

        });

    });

    return totalMonetaryShares;

};

/**
 * Converts monetary shares to "state shares"
 *
 * @param {TotalMonetaryShares} monetaryShares
 * @param {number} totalExpenses
 * @returns {Shares}
 */
export const monetarySharesToStateShares = function (monetaryShares, totalExpenses) {

    return _.mapValues(monetaryShares, (monetaryShare)=> {

        return (monetaryShare / totalExpenses) * 100;

    });

};