import Product from '../components/Product'
import ProductsList from '../containers/ProductsList'

const App = React.createClass({
    render: function () {
        return (
            <div>
                <ProductsList />
            </div>
        );
    }
});

export default App;