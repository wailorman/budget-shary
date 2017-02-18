import {budgetsListReducer} from '../budgetsListReducer';
import {DELETE_BUDGET, FETCH_BUDGETS_LIST} from '../../actions';

describe("UNIT / Reducers / budgetsListReducer", ()=> {

    it(`not throw if no action.type`, () => {
        expect(budgetsListReducer.bind(null, Immutable.Map(), {})).to.not.throw();
    });

    describe("FETCH_BUDGETS_LIST", () => {

        it(`should convert action.result`, () => {

            const action = {
                type: FETCH_BUDGETS_LIST,
                result: {
                    _b_1: {
                        id: '_b_1',
                        name: 'First'
                    },
                    _b_2: {
                        id: '_b_2',
                        name: 'Second'
                    }
                }
            };

            const expected = Immutable.Map({
                _b_1: Immutable.Map({
                    id: '_b_1',
                    name: 'First'
                }),
                _b_2: Immutable.Map({
                    id: '_b_2',
                    name: 'Second'
                })
            });

            expect(budgetsListReducer({}, action)).to.eql(expected);

        });
        
        it(`fill up`, () => {

            const action = {
                type: FETCH_BUDGETS_LIST,
                result: {}
            };

            const initial = Immutable.Map({
                _b_1: Immutable.Map({
                    id: '_b_1',
                    name: 'First'
                }),
                _b_2: Immutable.Map({
                    id: '_b_2',
                    name: 'Second'
                })
            });

            expect(budgetsListReducer(initial, action)).to.eql(Immutable.Map());
            
        });

        it(`throw if no action.result`, () => {

            const action = {
                type: FETCH_BUDGETS_LIST
            };

            expect(budgetsListReducer.bind(null, Immutable.Map(), action)).to.throw();

        });

    });

    describe("DELETE_BUDGET", ()=> {
        
        it(`should remove budget from list if .success=true`, () => {

            const action = {
                type: DELETE_BUDGET,
                id: '_b_1',
                success: true
            };

            const initialState = Immutable.Map({
                _b_1: Immutable.Map({
                    id: '_b_1',
                    name: 'First'
                }),
                _b_2: Immutable.Map({
                    id: '_b_2',
                    name: 'Second'
                })
            });

            const resultState = budgetsListReducer(initialState, action);

            const expectedState = Immutable.Map({
                _b_2: Immutable.Map({
                    id: '_b_2',
                    name: 'Second'
                })
            });

            expect(resultState).to.eql(expectedState);

        });

        it(`should not remove budget from list if .success=false`, () => {

            const action = {
                type: DELETE_BUDGET,
                id: '_b_1',
                success: false
            };

            const initialState = {
                _b_1: {
                    id: '_b_1',
                    name: 'First'
                },
                _b_2: {
                    id: '_b_2',
                    name: 'Second'
                }
            };

            const resultState = budgetsListReducer(initialState, action);

            const expectedState = {
                _b_1: {
                    id: '_b_1',
                    name: 'First'
                },
                _b_2: {
                    id: '_b_2',
                    name: 'Second'
                }
            };

            expect(resultState).to.eql(expectedState);

        });

        it(`should not remove budget from list if .success isn't defined`, () => {

            const action = {
                type: DELETE_BUDGET,
                id: '_b_1'
            };

            const initialState = {
                _b_1: {
                    id: '_b_1',
                    name: 'First'
                },
                _b_2: {
                    id: '_b_2',
                    name: 'Second'
                }
            };

            const resultState = budgetsListReducer(initialState, action);

            const expectedState = {
                _b_1: {
                    id: '_b_1',
                    name: 'First'
                },
                _b_2: {
                    id: '_b_2',
                    name: 'Second'
                }
            };

            expect(resultState).to.eql(expectedState);

        });

        it(`should not remove budget from list if .id isn't defined`, () => {

            const action = {
                type: DELETE_BUDGET,
                success: true
            };

            const initialState = Immutable.Map({
                _b_1: Immutable.Map({
                    id: '_b_1',
                    name: 'First'
                }),
                _b_2: Immutable.Map({
                    id: '_b_2',
                    name: 'Second'
                })
            });

            const resultState = budgetsListReducer(initialState, action);

            const expectedState = Immutable.Map({
                _b_1: Immutable.Map({
                    id: '_b_1',
                    name: 'First'
                }),
                _b_2: Immutable.Map({
                    id: '_b_2',
                    name: 'Second'
                })
            });

            expect(resultState).to.eql(expectedState);

        });
        
    });

});