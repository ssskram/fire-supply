import { fetch } from 'domain-task';

const load = 'load'
const add = 'add'
const update = 'update'
const del = 'delete'
const submit = 'submit'
const receive = 'receive'

const unloadedState: CartState = {
    cart: [],
    submitted: '',
    user: '',
    house: '',
    comments: '',
    emergency: '',
    emergencyJustification: '',
    narcanCases: '',
    narcanExplanation: ''
};

export interface ID {
    id: string
}

export interface CartState {
    cart: CartItems[]
    submitted: string
    user: string
    house: string
    comments: string
    emergency: string
    emergencyJustification: string
    narcanCases: string
    narcanExplanation: string
}

export interface CartItems {
    quantity: number
    id: number
    family: string
    obj: string
    unit: string
}

export const actionCreators = {
    loadCart: () => (dispatch) => {
        fetch('/api/cart/load', {
            credentials: 'same-origin',
            headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8'
            }
        })
            .then(response => response.json())
            .then(data => {
                dispatch({ type: load, cart: data.items, id: data.id });
            });
    },

    addItem: (item) => (dispatch) => {
        console.log(item)
        fetch('/api/cart/put', {
            method: 'POST',
            body: item,
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then (dispatch ({
            type: add, item
        }))
    },

    updateItem: (item) => (dispatch) => {
        console.log(item)
        fetch('/api/cart/put', {
            method: 'POST',
            body: item,
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then (dispatch ({
            type: update, item
        }))
    },

    deleteItem: (item) => (dispatch) => {
        fetch('/api/cart/put', {
            method: 'POST',
            body: item,
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then (dispatch ({
            type: del, item
        }))
    },

    submitCart: (order) => (dispatch) => {
        fetch('/api/cart/put', {
            method: 'POST',
            body: order,
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then (dispatch ({
            type: submit
        }))
    },
};

export const reducer = (state: CartState, action) => {
    switch (action.type) {
        case load:
            return {
                cart: state.cart,
                cartID: action.id
            };
        case add:
            return {
                ...state,
                cart: state.cart.concat(action.item.item)
            };
        case update:
            return {
                ...state,
                cart: state.cart.map(cart => cart.obj === action.item.item.obj ?
                    { ...cart, quantity: action.item.item.quantity } : cart
                )
            };
        case del:
            return {
                ...state,
                cart: state.cart.filter(function (i) {
                    return i.obj !== action.item.item.obj;
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