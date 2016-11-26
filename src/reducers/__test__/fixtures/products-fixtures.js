import deepFreeze from 'deep-freeze';

export const exampleProductsState = {
    1: {id: '1', name: 'Water', price: '40', ownerId: '1'},
    2: {id: '2', name: 'Milk', price: '60', ownerId: '2'}
};

deepFreeze(exampleProductsState);