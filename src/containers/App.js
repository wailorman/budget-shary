import Product from '../components/Product'

const App = React.createClass({
    render: function () {
        return (
            <div>
                <Product name="Milk" price="100"/>
            </div>
        );
    }
});

export default App;