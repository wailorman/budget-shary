import {budgetsListReducer} from '../budgetsListReducer';
import {DELETE_BUDGET} from '../../actions';

describe("UNIT / Reducers / budgetsListReducer", ()=> {

    // todo: FETCH_BUDGETS_LIST

    describe("DELETE_BUDGET", ()=> {
        
        it(`should remove budget from list if .success=true`, () => {

            const action = {
                type: DELETE_BUDGET,
                id: '_b_1',
                success: true
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
                _b_2: {
                    id: '_b_2',
                    name: 'Second'
                }
            };

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
        
    });

});