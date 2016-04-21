export const INCOME = 'INCOME';
export const OUTCOME = 'OUTCOME';

export const totalExpenses = function (state) {

    let result = 0;

    _.each(state.products, (product)=> {
        result += parseInt(product.price);
    });

    return Math.abs(result);

};

export const ownExpenses = function (state, personId) {

    let result = 0;

    _.chain(state.products)
        .filter((product) => {
            return product.ownerId == personId;
        })
        .each((product)=> {
            result += parseInt(product.price);
        })
        .value();

    return Math.abs(result);

};

export const shareInMonetary = function (state, personId) {

    const person = _.find(state.persons, {id: personId});
    const shareInPercentage = parseInt(person.share) * 0.01;

    const totalExp = totalExpenses(state);

    return totalExp * shareInPercentage;

};

export const createTransaction = function (state, from, to, total) {

    let newState = _.cloneDeep(state);

    const newTransaction = { from, to, total };

    if (!newState.transactions) newState.transactions = [];

    newState.transactions.push(newTransaction);

    return newState;

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

    return (
            shareInMonetary(state, personId) -
            ownExpenses(state, personId) +
            transactionsTotal(state, INCOME, personId) -
            transactionsTotal(state, OUTCOME, personId)
        );
};

export const splitToNegativeAndPositive = function (state) {

    let room = {
        positive: [],
        negative: []
    };

    _.each(state.persons, ({id})=> {
        const personFunds = getFunds(state, id);
        if (personFunds >= 0)
            room.positive.push(id);
        else
            room.negative.push(id);
    });

    return room;

};