import {fetchState, pushState, STATE_KEY} from '../../../src/core/state-sync'
import {fakeState} from '../../fixtures/fake-state'

const localStorage = require('localStorage');

describe("UNIT / Core / Storage Sync", ()=> {

    const deps = {
        localStorage
    };

    beforeEach(()=> {
        localStorage.clear();
    });

    describe("#fetchState()", ()=> {

        it(`should return null as last state if we are newbie`, () => {

            const actual = fetchState(deps);

            const expected = null;

            expect(actual).to.eql(expected);

        });

        it(`should return some state if we already save some work`, () => {

            localStorage.setItem(STATE_KEY, JSON.stringify(fakeState));

            const actual = fetchState(deps);

            expect(actual).to.eql(fakeState);

        });

        it(`should return null if json string in storage isn't valid`, () => {

            localStorage.setItem(STATE_KEY, '{"foo:');

            const actual = fetchState(deps);

            const expected = null;

            expect(actual).to.eql(expected);

        });

    });

    describe("#pushState()", ()=> {

        it(`should return {} if we are pushing empty state`, () => {

            const actual = pushState({}, deps);

            const expected = {};

            expect(actual).to.eql(expected);

        });

        it(`should return the same state we passed`, () => {

            const actual = pushState(fakeState, deps);

            expect(actual).to.eql(fakeState);

        });

    });

});