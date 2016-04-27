"use strict";


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


    const newTransaction = { from, to, total };

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

export const tryTransaction = function (positiveFunds, negativeFunds) {

    if (positiveFunds < 0){
        console.error(new Error(`positiveFunds can't be negative`));
        return 0;
    }

    if (negativeFunds > 0) {
        console.error(new Error(`negativeFunds can't be positive`));
        return 0;
    }

    const absPositiveFunds = Math.abs(positiveFunds);
    const absNegativeFunds = Math.abs(negativeFunds);

    if ( absPositiveFunds <= absNegativeFunds ){
        return absPositiveFunds;
    }else{
        return absNegativeFunds;
    }

};

export const transactionsTotal = function (state, direction, personId) {

    // todo: funds after transaction

    let directionFilterField;

    if (direction == INCOME)
        directionFilterField = 'to';
    else if (direction == OUTCOME)
        directionFilterField = 'from';
    else
        throw new Error(`Invalid direction: ${direction}`);

    if (!state.transactions) return 0;

    const filteredTransactions = state.transactions.filter((transaction)=> {
        return transaction[directionFilterField] == personId;
    });

    return _.sum(filteredTransactions, 'total');

};

export const getFunds = function (state, personId) {

    return _.round(
            shareInMonetary(state, personId) -
            ownExpenses(state, personId) +
            transactionsTotal(state, INCOME, personId) -
            transactionsTotal(state, OUTCOME, personId)
        , 4);
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
        return ownExchangeOffice.positive.length>0 && ownExchangeOffice.negative.length>0;

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