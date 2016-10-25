import '../styles/Transaction.css';

export const Transaction = ({from, to, total}) => {
    return (
        <div className="Transaction">
            <div className="Transaction__from">
                {from}
            </div>

            <div className="Transaction__arrow-container">
                <div className="Transaction__arrow">
                    &rarr;
                </div>
                <div className="Transaction__total">
                    {total}
                </div>
            </div>

            <div className="Transaction__to">
                {to}
            </div>
        </div>
    );
};

Transaction.PropTypes = {
    from: React.PropTypes.string,
    to: React.PropTypes.string,
    total: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number
    ])
};

export default Transaction;