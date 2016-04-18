export const totalExpenses = function (state) {

    let result = 0;

    _.each(state.products, (product)=> {
        result += parseInt(product.price);
    });

    return result;

};

export const ownExpenses = function (state, personId) {

    let result = 0;

    _.chain(state.products)
        .filter((product) => {
            debugger;
            return product.ownerId == personId;
        })
        .each((product)=> {
            result += parseInt(product.price);
        })
        .value();

    return result;

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