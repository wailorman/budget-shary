import Transaction from './Transaction';
import {connect} from 'react-redux';

import { transactionsArraySelector } from '../selectors/transactions';

@connect(
    (state) => {
        return {
            transactions: transactionsArraySelector(state)
        };
    }
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
