
const load = 'load';
const add = 'add';

export interface CartState {
    cart: CartItems[]
}

export interface CartItems {
    quantity: any
    id: any
    family: any
    obj: any
    unit: any
}

export const actionCreators = {
    loadCart: () => ({ type: load }),
    updateCart: (newItem) => (
        console.log(newItem),
        { type: add, newItem }
    )
};

const unloadedState: CartState = { cart: [] };

export const reducer = (state: CartState, action) => {

    if (action.type === load) {
        return { ...state, cart: [] };
    }

    if (action.type === add) {
        return { 
            ...state,  
            cart: state.cart.concat(action.newItem) 
        };
    }

    return state || unloadedState;
};