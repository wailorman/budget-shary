import { proceedInterchange } from './../interchange';

import { fakeStateCase1 } from '../../../../test/fixtures/fake-state';

import deepFreeze from 'deep-freeze';

describe("UNIT / Core / Interchange", ()=> {

    let sandbox;

    beforeEach(()=> {

        sandbox = sinon.sandbox.create();

        sandbox.stub(console, 'log');
        sandbox.stub(console, 'error');
        sandbox.stub(console, 'info');
        sandbox.stub(console, 'warn');
    });

    afterEach(()=> {
        sandbox.restore();
    });

    describe("#proceedInterchange()", ()=> {

        it(`should return correct new state`, () => {

            deepFreeze(fakeStateCase1);

            const result = proceedInterchange(fakeStateCase1);

            expect(result.transactions[0]).to.eql({
                from: 'Jack', to: 'Alice', total: 611.4
            });

            expect(result.transactions[1]).to.eql({
                from: 'Jack', to: 'Mike', total: 1144.4
            });

        });

        it(`should remove old transactions`, () => {

            const result = proceedInterchange(proceedInterchange(fakeStateCase1));

            expect(result.transactions.length).to.eql(2);

        });

    });

});