export const getAmountOfProductParticipants = function (productParticipatingElem) {

    let amountOfParticipants = 0;

    _.forIn(productParticipatingElem, (participantState)=> {
        if (participantState == true){
            amountOfParticipants++;
        }
    });

    return amountOfParticipants;

};

export const calculateMonetarySharesForProduct = function (productParticipatingElem, productPrice) {

    const amountOfParticipants = getAmountOfProductParticipants(productParticipatingElem);

    const equalShareForAllParticipants = productPrice / amountOfParticipants;

    let result = {};

    _.forIn(productParticipatingElem, (participantState, productId)=> {

        if (participantState == true) {
            result[productId] = equalShareForAllParticipants;
        }

    });

    return result;

};

export const calculateMonetarySharesForProductsCollection = function (productParticipatingCollection, products) {

    let result = {};

    _.forIn(productParticipatingCollection, (productParticipatingElem, productId)=> {

        try {
            result[productId] = calculateMonetarySharesForProduct(productParticipatingElem, products[productId].price);
        } catch(e) {
            // todo: Make error message more clear
            console.error(`Error in calculating participating monetary share: ${e}`);
        }

    });

    return result;

};

/**
 * Calculates sum of monetary shares from each product
 *
 * @param monetaryParticipatingShares result of calculateMonetarySharesForProductsCollection() calculation
 */
export const totalMonetarySharesByParticipating = function (monetaryParticipatingShares) {

    const totalMonetaryShares = {};

    _.forIn(monetaryParticipatingShares, (participatingShare)=> {

        _.forIn(participatingShare, (monetaryShare, personId)=> {

            if ( ! totalMonetaryShares[personId] ) {
                totalMonetaryShares[personId] = 0;
            }
            totalMonetaryShares[personId] += monetaryShare;

        });

    });

    return totalMonetaryShares;

};

/**
 * Calculates partial shares by participating monetary shares
 *
 * @param monetaryShares result of totalMonetarySharesByParticipating
 * @param totalExpenses
 */
export const monetarySharesToStateShares = function (monetaryShares, totalExpenses) {

    return _.mapValues(monetaryShares, (monetaryShare)=> {

        return (monetaryShare / totalExpenses) * 100;

    });

};