import { removeProduct } from '../../src/actions'
import { store, generateStore } from '../../src/store'
import { normalizedFakeState } from '../fixtures/fake-state'

describe("UNIT / Store", ()=> {

    let fakeStore;

    beforeEach(()=> {
        fakeStore = generateStore(normalizedFakeState);
    });

    describe("products actions", ()=> {

        describe("remove", ()=> {

            it(`should remove product`, () => {

                fakeStore.dispatch(removeProduct("2"));

                const resultState = fakeStore.getState();

                expect(resultState.products['1']).to.exist;
                expect(resultState.products['2']).to.not.exist;

            });

        });

    });

});