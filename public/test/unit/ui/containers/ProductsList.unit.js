import ProductsList from '../../../../src/containers/ProductsList'
import {normalizedBigFakeState} from '../../../fixtures/fake-state'
import {generateStore} from '../../../../src/store'

describe("UNIT / Containers / <ProductsList />", ()=> {

    const setup = (props = {})=> {

        const store = generateStore({initialState: normalizedBigFakeState});

        const ownerId = 1;
        const productsIds = _(normalizedBigFakeState.products)
            .filter((product) => product.ownerId == ownerId)
            .map('id')
            .value();

        _.defaults(props, { ownerId, productsIds });

        let wrapper = enzyme.shallow(<ProductsList {...props} store={store}/>).shallow();

        return {props, wrapper};

    };

    it(`should have 2 products which id's we passed`, () => {

        const {wrapper} = setup();

        expect(wrapper.children().length).to.eql(2);

        expect(wrapper.children().at(0).props().id).to.eql('1');
        expect(wrapper.children().at(1).props().id).to.eql('2');

    });

});