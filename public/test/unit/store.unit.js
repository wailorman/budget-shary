import { removeProduct } from '../../src/actions'
import { store, generateStore } from '../../src/store'
import { fakeState } from '../fixtures/fake-state'

describe("UNIT / Store", ()=> {

    let fakeStore;

    beforeEach(()=> {
        fakeStore = generateStore(fakeState);
    });

    describe("products actions", ()=> {

        describe("remove", ()=> {

            it(`should remove product`, () => {

                fakeStore.dispatch(removeProduct("2"));

                const resultState = fakeStore.getState();

                expect(resultState.products[0]).to.exist;
                expect(resultState.products[1]).to.not.exist;

            });

        });

    });

});