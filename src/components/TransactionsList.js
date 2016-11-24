import Transaction from './Transaction';
import {connect} from 'react-redux';


@connect(
    ({transactions}) => ({transactions})
)
export class TransactionsList extends React.Component {

    render() {

        const { transactions } = this.props;

        const transactionsList = transactions.map((transaction, index) => {
            return <Transaction
                key={index}
                {... transaction}
            />;
        });

        return (
            <div className="TransactionsList">
                {transactionsList}
            </div>
        );
    }

    static propTypes = {
        transactions: React.PropTypes.arrayOf(
            React.PropTypes.shape(Transaction.PropTypes)
        )
    }

}

export default TransactionsList;