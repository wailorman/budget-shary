import {getProductsByPersonId, getFlatValidationErrors} from '../../../src/core/components-utils'

describe("UNIT / Core / Components Utils", ()=> {

    describe("#getProductsByPersonId()", ()=> {

        const state = {

            persons: [
                {id: '_1', name: 'Jack', share: '30'},
                {id: '_2', name: 'Alice', share: '60'},
                {id: '_3', name: 'Mike', share: '10'}
            ],
            products: [
                {id: '_1', name: '',     price: '45',    ownerId: '_1'},
                {id: '_2', name: '',     price: '234',   ownerId: '_1'},
                {id: '_3', name: '',     price: '12',    ownerId: '_1'},
                {id: '_4', name: '',     price: '89',    ownerId: '_1'},
                {id: '_5', name: '',     price: '65',    ownerId: '_1'},
                {id: '_6', name: '',     price: '234',   ownerId: '_1'},

                {id: '_7', name: '',     price:  '345',  ownerId: '_2'},
                {id: '_8', name: '',     price:  '234',  ownerId: '_2'},
                {id: '_9', name: '',     price:  '890',  ownerId: '_2'},
                {id: '_10', name: '',    price: '1234',  ownerId: '_2'},
                {id: '_11', name: '',    price: '671',   ownerId: '_2'},
                {id: '_12', name: '',    price: '55',    ownerId: '_2'},
                {id: '_13', name: '',    price: '176',   ownerId: '_2'},
                {id: '_14', name: '',    price: '1876',  ownerId: '_2'},

                {id: '_15', name: '',    price: '504',   ownerId: '_3'},
                {id: '_16', name: '',    price: '646',   ownerId: '_3'},
                {id: '_17', name: '',    price: '756',   ownerId: '_3'},
                {id: '_18', name: '',    price: '50',    ownerId: '_3'}
            ]
            
        };

        it(`should return all Jack's products`, () => {
            
            const actual = getProductsByPersonId('_1', state.products);
            
            const expected = [
                {id: '_1', name: '',     price: '45',    ownerId: '_1'},
                {id: '_2', name: '',     price: '234',   ownerId: '_1'},
                {id: '_3', name: '',     price: '12',    ownerId: '_1'},
                {id: '_4', name: '',     price: '89',    ownerId: '_1'},
                {id: '_5', name: '',     price: '65',    ownerId: '_1'},
                {id: '_6', name: '',     price: '234',   ownerId: '_1'}
            ];
            
            expect(actual).to.eql(expected);
            
        });
        
    });

    describe("#getFlatValidationErrors()", ()=> {

        it(`should return flat array of error messages`, () => {

            const errorsObject = {
                id: [
                    'ID missing',
                    'Another ID'
                ],
                name: [
                    'Name is invalid',
                    'Strange Name'
                ],
                share: [
                    'Share should be between 0..100',
                    'Share should contain only digits and dots'
                ]
            };

            const expected = [
                'ID missing',
                'Another ID',
                'Name is invalid',
                'Strange Name',
                'Share should be between 0..100',
                'Share should contain only digits and dots'
            ];

            const actual = getFlatValidationErrors(errorsObject);

            expect(actual).to.eql(expected);

        });

        it(`should works properly if some of `, () => {

            const errorsObject = {
                id: [
                    'ID missing',
                    'Another ID'
                ],
                name: [
                    'Name is invalid',
                    'Strange Name'
                ],
                share: undefined
            };

            const expected = [
                'ID missing',
                'Another ID',
                'Name is invalid',
                'Strange Name'
            ];

            const actual = getFlatValidationErrors(errorsObject);

            expect(actual).to.eql(expected);

        });

        it(`should return empty array if errors === undefined`, () => {

            const errorsObject = undefined;

            const expected = [];

            const actual = getFlatValidationErrors(errorsObject);

            expect(actual).to.eql(expected);

        });

    });

});