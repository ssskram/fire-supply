import { fetch } from 'domain-task';

const loadCart = 'load'
const add = 'add'
const update = 'update'
const del = 'delete'
const submit = 'submit'

const unloadedState: CartState = {
    cart: [],
};

export interface ID {
    id: string
}

export interface CartState {
    cart: CartItems[]
}

export interface CartItems {
    quantityOrdered: number
    itemID: number
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
                dispatch({ type: loadCart, cart: data.items, id: data.id });
            });
    },

    addItem: (item) => (dispatch) => {
        let data = JSON.stringify({
            cartID: item.cartID,
            obj: item.obj,
            itemID: item.itemID,
            family: item.family,
            unit: item.unit,
            quantityOrdered: item.quantityOrdered
        })
        fetch('/api/cart/addItem', {
            method: 'POST',
            body: data,
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(dispatch({
                type: add, item
            }))
    },

    deleteItem: (item) => (dispatch) => {
        let data = JSON.stringify({
            cartID: item.cartID,
            obj: item.obj,
            itemID: item.itemID,
            family: item.family,
            unit: item.unit,
            quantityOrdered: item.quantityOrdered
        })
        fetch('/api/cart/deleteItem', {
            method: 'POST',
            body: data,
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(dispatch({
                type: del, item
            }))
    },

    changeQty: (item) => (dispatch) => {
        let data = JSON.stringify({
            cartID: item.cartID,
            obj: item.obj,
            itemID: item.itemID,
            family: item.family,
            unit: item.unit,
            quantityOrdered: item.quantityOrdered
        })
        console.log(data)
        fetch('/api/cart/changeQuantity', {
            method: 'POST',
            body: data,
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(dispatch({
                type: update, item
            }))
    },

    submitCart: (order) => (dispatch) => {
        let data = JSON.stringify({
            id: order.id,
            house: order.house,
            comments: order.comments,
            emergency: order.emergency,
            emergencyJustification: order.emergencyJustification,
            narcanCases: order.narcanCases,
            narcanExplanation: order.narcanExplanation
        })
        fetch('/api/cart/submitOrder', {
            method: 'POST',
            body: data,
            credentials: 'same-origin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(dispatch({
                type: submit
            }))
    },
};

export const reducer = (state: CartState, action) => {
    switch (action.type) {
        case loadCart:
            return {
                ...state,
                cart: action.cart,
                cartID: action.id
            }
        case add:
            return {
                ...state,
                cart: state.cart.concat(action.item)
            };
        case update:
            return {
                ...state,
                cart: state.cart.map(cart => cart.obj === action.item.obj ?
                    { ...cart, quantityOrdered: action.item.quantityOrdered } : cart
                )
            };
        case del:
        // TODO - replace this function with a shared update function
            return {
                ...state,
                cart: state.cart.filter(function (i) {
                    return i.obj !== action.item.obj;
                })
            };
        case submit:
            return {
                cart: [],
                cartID: ''
            }
    }

    return state || unloadedState;
};