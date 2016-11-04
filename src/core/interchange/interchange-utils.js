import {
    monetarySharesForProduct,
    monetarySharesForProductsCollection,
    productParticipants,
    monetarySharesToStateShares,
    totalMonetaryShares
} from './participating-utils';

export const INCOME = 'INCOME';
export const OUTCOME = 'OUTCOME';

/**
 * @typedef {number|string} ID
 */





/**
 * @typedef {object} Transaction
 * @property {ID} from
 * @property {ID} to
 * @property {number} total
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
 * @typedef {number} Funds
 *
 * ```
 * Goal of this application is to equalize _expenses_ of all persons.
 *
 * For example, two guys (Mike and Jimmy) want to drink a beer at home. Mike
 * went to a shop and buy two bottles of beer and spent 60 dollars (it's very expensive beer).
 *
 * Our goal is to equalize expenses of all persons.
 *
 * So.
 * Both guys have the same _shares_ in this _budget_ -- 50%.
 * Mike have $60 expenses. Jimmy -- $0 expenses.
 * That is, _monetary shares_ of each guy = $30 _(totalExpenses * share)_
 *
 * Our goal is to equalize own expenses and monetary shares for each person.
 *
 * By this example, funds of
 * Mike = 30 - 60 = -30
 * Jimmy = 30 - 0 = +30
 *
 * Funds calculated by this formula:
 * **Funds = shareInMonetary - ownExpenses [ + incomeTransactionsTotal - outcomeTransactionsTotal ]**
 *
 * To make funds of each persons equals 0, we can follow two ways:
 *   1. Reduce monetary share of Jimmy to 0 and increase for Mike to 60.
 *      But this way Mike will become drunk.
 *   2. Reduce expenses of Mike to 30 and increase for Jimmy to 30 too.
 *
 * I think, Jimmy will like second way. So how to change expenses?
 * Easy! Jimmy should give $30 to Mike. In other language, we
 * need to create a transaction from Jimmy to Mike with 30 dollars total.
 *
 * After transaction has been proceeded, let's recalculate funds for beer-guys.
 * Mike = 30 - 60 + 30 - 0 = 0
 * Jimmy = 30 - 0 + 0 - 30 = 0
 *
 * Funds are equalized and now guys are happy.
 * ```
 */










/**
 * Summing prices of products
 *
 * @param {object} products
 * @returns {number}
 */
export const totalExpenses = function ({products}) {

    let result = 0;

    _.each(products, (product)=> {
        result += parseInt(product.price || 0);
    });

    // Sometimes JS can return -0 instead of 0
    return Math.abs(result);

};

/**
 * Summing prices of all products bought by particular person
 *
 * @param {object} products
 * @param {ID} personId
 * @returns {number}
 */
export const ownExpenses = function ({products}, personId) {

    let result = 0;

    _.chain(products)
        .filter((product) => {
            return product.ownerId == personId;
        })
        .each((product)=> {
            result += parseInt(product.price || 0);
        })
        .value();

    // Sometimes JS can return -0 instead of 0
    return Math.abs(result);

};

/**
 *
 * @param products
 * @param persons
 * @param personId
 * @returns {MonetaryShare}
 */
export const shareInMonetary = function ({products, persons}, personId) {

    const person = _.find(persons, {id: personId});
    const shareInPercentage = parseInt(person.share || 0) * 0.01;

    const totalExp = totalExpenses({products});

    return totalExp * shareInPercentage;

};


/**
 * Sums all person's shares.
 * This function is using in validation.
 * Sum of all shares in budget should equal to 100.
 * Otherwise budget is invalid/
 *
 * @param {object} persons
 * @returns {number}
 */
export const sumAllShares = function (persons) {

    return _.chain(persons)
        .cloneDeep()
        .map((person)=> {
            return parseFloat(person.share || 0);
        })
        .sum()
        .round()
        .value();

};











/**
 * Pushes new transaction object to state.transactions array
 * (see generateTransaction)
 *
 * @deprecated
 *
 * @param {object} state
 * @param {ID} from
 * @param {ID} to
 * @param {number} total
 *
 * @throws Can't create transaction from __ to __. Person with id __ doesn't exist
 *
 * @returns New state with new transaction
 */
export const createTransaction = function (state, from, to, total) {

    let newState = _.cloneDeep(state);

    const cantFindErrorTpl = (nonexistentPersonId) =>
        new Error(`Can't create transaction from ${from} to ${to}.
        Person with id ${nonexistentPersonId} doesn't exist`);


    if (!_.find(state.persons, {id: from})) {
        throw (cantFindErrorTpl(from));
    }

    if (!_.find(state.persons, {id: to})) {
        throw (cantFindErrorTpl(to));
    }

    if (total < 0)
        throw new Error(`Can't create transaction with negative (${total}) total`);

    if (total == 0)
        return state;


    const newTransaction = {from, to, total};

    if (!newState.transactions) newState.transactions = [];

    newState.transactions.push(newTransaction);

    return newState;

};

/**
 *
 * @param {ID} from      Sender person ID
 * @param {ID} to        Receiver person ID
 * @param [persons] Array of all persons in [{id: '102'}] format at least
 *
 * @throws Transaction sender and receiver are the same
 * @throws Can't create transaction from __ to __. Person with id __ doesn't exist
 *
 * @return undefined  if validation accomplished
 */
export const validateTransactionMembers = function (from, to, persons) {

    if (from == to) {
        // todo: Missing transaction members
        throw new Error(`Transaction sender and receiver are the same`);
    }

    if (persons) {

        const cantFindErrorTpl = (nonexistentPersonId) =>
            new Error(`Can't create transaction from ${from} to ${to}.
        Person with id ${nonexistentPersonId} doesn't exist`);

        if (!_.find(persons, {id: from}) && !_.find(persons, {id: to})) {
            throw (cantFindErrorTpl(`${from} & ${to}`));
        }

        if (!_.find(persons, {id: from})) {
            throw (cantFindErrorTpl(from));
        }

        if (!_.find(persons, {id: to})) {
            throw (cantFindErrorTpl(to));
        }

    } else {

        console.warn('Persons array is empty. Unable to validate');

    }

};


/**
 * Generates basic transaction object
 *
 * @param {ID} from      Sender person ID
 * @param {ID} to        Receiver person ID
 * @param {ID} total     Money to send
 * @param [persons]      Array of all persons in [{id: '102'}] format at least
 * @returns {Transaction}
 */
export const generateTransaction = function (from, to, total, persons) {

    validateTransactionMembers(from, to, persons);

    if (total < 0)
        throw new Error(`Can't create transaction with negative (${total}) total`);

    return {from, to, total};

};


/**
 * Calculates total of future transaction.
 *
 * The goal of this function is to not allow send more money
 * that sender have or not more recipient needed.
 *
 * @param {number} positiveFunds
 * @param {number} negativeFunds
 * @returns {number}
 */
export const tryTransaction = function (positiveFunds, negativeFunds) {

    if (positiveFunds < 0) {
        console.error(new Error(`positiveFunds can't be negative`));
        return 0;
    }

    if (negativeFunds > 0) {
        console.error(new Error(`negativeFunds can't be positive`));
        return 0;
    }

    const absPositiveFunds = Math.abs(positiveFunds);
    const absNegativeFunds = Math.abs(negativeFunds);

    if (absPositiveFunds <= absNegativeFunds) {
        return absPositiveFunds;
    } else {
        return absNegativeFunds;
    }

};

/**
 * Sum all transactions per person filtered by direction
 *
 * @param {[Transaction]}   transactions
 * @param {string}          direction     INCOME or OUTCOME
 * @param {ID}              personId
 * @returns {number}
 */
export const transactionsTotal = function ({transactions}, direction, personId) {

    // todo: funds after transaction

    let directionFilterField;

    if (direction == INCOME)
        directionFilterField = 'to';
    else if (direction == OUTCOME)
        directionFilterField = 'from';
    else
        throw new Error(`Invalid direction: ${direction}`);

    if (!transactions) return 0;

    const filteredTransactions = transactions.filter((transaction)=> {
        return transaction[directionFilterField] == personId;
    });

    return _.sumBy(filteredTransactions, 'total');

};

/**
 * Replaces all ids in transaction object with appropriately persons names
 *
 * @param {object} state
 * @returns {object}
 */
export const humanifyTransactions = function (state) {

    let newState = _.cloneDeep(state);

    if (!newState.transactions) newState.transactions = [];

    newState.transactions = newState.transactions.map(({from, to, total})=> {

        let result = {};

        try {
            result.from = _.find(state.persons, {id: from}).name;
        } catch (e) {
            console.error(`Can't get name of #${from} person: ${e}`);
            result.from = from;
        }

        try {
            result.to = _.find(state.persons, {id: to}).name;
        } catch (e) {
            console.error(`Can't get name of #${to} person: ${e}`);
            result.to = to;
        }

        result.total = total;

        return result;

    });

    return newState;

};


export const generateTransactionWithFunds = function (state, from, to, total, deps = {}) {

    const clonedState = _.cloneDeep(state);

    _.defaults(clonedState, {
        products: [],
        persons: [],
        transactions: []
    });

    const {products, persons, transactions} = clonedState;

    // for mocking
    _.defaults(deps, {generateTransaction, getFunds, getFundsForAllPersons});

    const fundsBefore = getFundsForAllPersons(clonedState);

    const generatedTransaction = generateTransaction(from, to, total, persons);

    const concatenatedTransactions = transactions.concat(generatedTransaction);
    const updatedState = {products, persons, transactions: concatenatedTransactions};

    const fundsAfter = getFundsForAllPersons(updatedState);

    return {
        fundsBefore,
        ...generatedTransaction,
        fundsAfter
    };

};










/**
 * Calculating funds for particular person
 *
 * @param {object} state
 * @param {ID} personId
 * @returns {Funds}
 */
export const getFunds = function (state, personId, deps = {}) {

    const {products, persons, transactions} = state;

    // for mocking
    _.defaults(deps, {shareInMonetary, ownExpenses, transactionsTotal});

    // clc = calculated
    const clc = {
        shareInMonetary: deps.shareInMonetary({products, persons}, personId),

        ownExpenses: deps.ownExpenses({products}, personId),

        incomeTransactionsTotal: deps.transactionsTotal({transactions}, INCOME, personId),

        outcomeTransactionsTotal: deps.transactionsTotal({transactions}, OUTCOME, personId)
    };

    const result = clc.shareInMonetary - clc.ownExpenses + clc.incomeTransactionsTotal - clc.outcomeTransactionsTotal;

    let roundedResult = _.round(result, 4);

    // sometimes getFunds() returns -0 after interchange
    // this hack is fixing problem
    if (roundedResult == 0)
        roundedResult = 0;

    return roundedResult;
};

/**
 * Calculating funds for all persons mentioned in the state
 *
 * Returns smth like
 * ```
 * {
 *     _person_1: -30,
 *     _person_2: 30
 * }
 * ```
 *
 * @param {object} state
 * @returns {object}
 */
export const getFundsForAllPersons = function (state, deps = {}) {

    const {persons} = state;

    // for mocking
    _.defaults(deps, {getFunds});

    return persons.map(({id})=> {
        let result = {};

        try {
            result[id] = deps.getFunds(state, id);
        } catch (e) {
            result[id] = null;
            console.error(e);
        }

        return result;
    });

};

/**
 * Creating an abstract room with all persons and split them
 * for those who have negative funds and for those who with positive funds
 *
 * @param {object} state
 * @returns {{positive: [ID], negative: [ID]}}
 */
export const splitToNegativeAndPositive = function (state, deps = {}) {

    // for mocking
    _.defaults(deps, {getFunds});

    let room = {
        positive: [],
        negative: []
    };

    _.each(state.persons, ({id})=> {
        const personFunds = deps.getFunds(state, id);

        if (personFunds > 0)
            room.positive.push(id);
        else if (personFunds < 0)
            room.negative.push(id);
    });

    return room;

};

export {
    monetarySharesForProduct,
    monetarySharesForProductsCollection,
    productParticipants,
    monetarySharesToStateShares,
    totalMonetaryShares
};