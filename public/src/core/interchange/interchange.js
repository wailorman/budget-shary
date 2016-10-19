import {
    splitToNegativeAndPositive,
    getFunds,
    createTransaction,
    humanifyTransactions,
    tryTransaction
} from './interchange-utils'

export default function interchange(state) {
    const deferred = Q.defer();

    try{
        deferred.resolve(proceedInterchange(state).transactions);
    }catch(e){
        deferred.reject(e);
    }

    return deferred.promise;
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