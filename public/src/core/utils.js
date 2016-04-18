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