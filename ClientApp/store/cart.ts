
const load = 'load'
const add = 'add'
const update = 'update'
const del = 'delete'
const submit = 'submit'
const receive = 'receive'

const unloadedState: CartState = {
    cart: []
};

export interface CartState {
    cart: CartItems[]
}

export interface CartItems {
    quantity: number
    id: number
    family: string
    obj: string
    unit: string
}

export const actionCreators = {
    loadCart: () => (
        // GET function here
        { type: load }
    ),

    addItem: (item) => (
        // PUT function here
        { type: add, item }
    ),

    updateItem: (item) => (
        // PUT function here
        { type: update, item }
    ),

    deleteItem: (item) => (
        // PUT function here
        { type: del, item }
    ),

    submitCart: (order) => () => (
        console.log(order),
        // SUBMIT function here
        { type: submit }
    ),
};

export const reducer = (state: CartState, action) => {
    switch (action.type) {
        case load:
            return {
                cart: state.cart
            };
        case add:
            return {
                ...state,
                cart: state.cart.concat(action.item)
            };
        case update:
            return {
                ...state,
                cart: state.cart.map(cart => cart.obj === action.item.obj ?
                    { ...cart, quantity: action.item.quantity } : cart
                )
            };
        case del:
            return {
                ...state,
                cart: state.cart.filter(function (i) {
                    return i.obj !== action.item.obj;
                })
            };
        case submit:
            return {
                cart: []
            };
        case receive:
            return {
                cart: action.cart
            }
    }

    return state || unloadedState;
};