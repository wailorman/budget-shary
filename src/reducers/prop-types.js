const propTypes = React.PropTypes;


const id = propTypes.oneOfType([propTypes.string, propTypes.number]);
const numberOrString = propTypes.oneOfType([propTypes.string, propTypes.number]);

////////////////////////////////////////

const person = propTypes.shape({
    id: id.isRequired,
    name: propTypes.string,
    share: numberOrString
});

const persons = propTypes.object; // todo: Make better checker

////////////////////////////////////////

const product = propTypes.shape({
    id: id.isRequired,
    name: propTypes.string,
    price: numberOrString
});

const products = propTypes.object;

////////////////////////////////////////

const productParticipatingElem = propTypes.object;
const productParticipating = propTypes.object;

////////////////////////////////////////

const transaction = propTypes.shape({
    from: id,
    to: id,
    total: numberOrString
});

const transactions = propTypes.arrayOf(transaction);

////////////////////////////////////////

export {
    id,
    numberOrString,
    person,
    persons,
    product,
    products,
    productParticipatingElem,
    productParticipating,
    transactions
};