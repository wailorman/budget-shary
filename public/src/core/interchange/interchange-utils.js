"use strict";

import {
    calculateMonetarySharesForProduct,
    calculateMonetarySharesForProductsCollection,
    getAmountOfProductParticipants,
    monetarySharesToPartialShares,
    totalMonetarySharesByParticipating
} from './participating-utils'

export const INCOME = 'INCOME';
export const OUTCOME = 'OUTCOME';

export const totalExpenses = function ({products}) {

    let result = 0;

    _.each(products, (product)=> {
        result += parseInt(product.price);
    });

    return Math.abs(result);

};

export const ownExpenses = function ({products}, personId) {

    let result = 0;

    _.chain(products)
        .filter((product) => {
            return product.ownerId == personId;
        })
        .each((product)=> {
            result += parseInt(product.price);
        })
        .value();

    return Math.abs(result);

};

export const shareInMonetary = function ({products, persons}, personId) {

    const person = _.find(persons, {id: personId});
    const shareInPercentage = parseInt(person.share) * 0.01;

    const totalExp = totalExpenses({products});

    return totalExp * shareInPercentage;

};


/**
 * Pushes new transaction object to state.transactions array
 * (see generateTransaction)
 *
 * @deprecated
 *
 * @param state
 * @param from
 * @param to
 * @param total
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
 * @param from      Sender person ID
 * @param to        Receiver person ID
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
 * @param from      Sender person ID
 * @param to        Receiver person ID
 * @param total     Money to send
 * @param [persons] Array of all persons in [{id: '102'}] format at least
 * @returns {{from: *, to: *, total: *}}
 */
export const generateTransaction = function (from, to, total, persons) {

    validateTransactionMembers(from, to, persons);

    if (total < 0)
        throw new Error(`Can't create transaction with negative (${total}) total`);

    return {from, to, total};

};

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
 * @param transactions
 * @param direction {string}  INCOME or OUTCOME
 * @param personId
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

export const proceedInterchange = function (state) {

    let newState = _.cloneDeep(state);

    newState.transactions = [];

    // room with negativeFunds & positiveFunds persons
    let exchangeOffice;

    const isExchangeOfficeNotEmpty = ()=> {

        const ownExchangeOffice = splitToNegativeAndPositive(newState);
        return ownExchangeOffice.positive.length > 0 && ownExchangeOffice.negative.length > 0;

    };


    // before
    exchangeOffice = splitToNegativeAndPositive(newState);

    while (isExchangeOfficeNotEmpty()) {

        exchangeOffice = splitToNegativeAndPositive(newState);

        const negativeFunds = getFunds(newState, exchangeOffice.negative[0]);

        const positiveFunds = getFunds(newState, exchangeOffice.positive[0]);

        const potentialTransactionTotal = tryTransaction(positiveFunds, negativeFunds);

        newState = createTransaction(
            newState,
            exchangeOffice.positive[0],
            exchangeOffice.negative[0],
            potentialTransactionTotal
        );

    }

    return humanifyTransactions(newState);

};

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

export const sumAllShares = function (persons) {

    return _.chain(persons)
        .cloneDeep()
        .map((person)=> {
            return parseInt(person.share) || 0;
        })
        .sum()
        .value();

};

export {
    calculateMonetarySharesForProduct,
    calculateMonetarySharesForProductsCollection,
    getAmountOfProductParticipants,
    monetarySharesToPartialShares,
    totalMonetarySharesByParticipating
};