import Transaction from './Transaction';



export const TransactionsList = ({ transactions }) => {

    const transactionsList = transactions.map((transaction, index)=> {
        return  <Transaction
                    key={index}
                    {... transaction}
                />;
    });

    return (
        <div className="TransactionsList">
            {transactionsList}
        </div>
    );
};

TransactionsList.propTypes = {
    transactions: React.PropTypes.arrayOf(
        React.PropTypes.shape(Transaction.PropTypes)
    )
};

export default TransactionsList;