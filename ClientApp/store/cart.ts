

const load = 'load'
const init = 'new'
const add = 'add'
const del = 'delete'
const submit = 'submit'
const receive = 'receive'

const unloadedState: CartState = {
    cart: [],
    house: ''
};

export interface CartState {
    cart: CartItems[]
    house: string
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

    newCart: (cart) => (
        // POST function here
        { type: init, cart }
    ),

    updateCart: (item) => (
        // PUT function here
        { type: add, item }
    ),

    deleteItem: (item) => (
        // PUT function here
        { type: del, item }
    ),

    submitCart: (cart) => (
        // PUT function here
        { type: submit, cart }
    )
};

export const reducer = (state: CartState, action) => {
    switch (action.type) {
        case load:
            return {
                cart: state.cart
            };
        case init:
            return {
                cart: state.cart
            };
        case add:
            return {
                ...state,
                cart: state.cart.concat(action.item)
            };
        case del:
            return {
                ...state,
                cart: state.cart.filter(function (i) {
                    return i.id !== action.item.id;
                })
            };
        case submit:
            return {
                cart: unloadedState
            };
        case receive:
            return {
                cart: action.cart
            }
    }

    return state || unloadedState;
};