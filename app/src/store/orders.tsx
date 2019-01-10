import { Action, Reducer } from 'redux'
import { AppThunkAction } from '.'
import * as constants from './constants'
import * as types from './types'

const unloadedState: types.orders = {
    orders: []
}

export const actionCreators = {
    loadOrders: (): AppThunkAction<any> => (dispatch) => {
        // get orders from mongo here

        // fetch("https://cartegraphapi.azurewebsites.us/pghSupply/allItems", {
        //     method: 'get',
        //     headers: new Headers({
        //         'Authorization': 'Bearer ' + process.env.REACT_APP_CART_API
        //     })

        // })
        //     .then(res => res.json())
        //     .then(data => {
        //         dispatch({ type: constants.getOrders, orders: data })
        //     })
    },
    newOrder: (order): AppThunkAction<any> => async (dispatch) => {
        const response = await fetch('http://localhost:3000/save/newOrder', {
            method: 'POST',
            body: JSON.stringify(order),
            headers: new Headers({
                'Authorization': 'Bearer ' + process.env.REACT_APP_MONGO,
                'Content-Type': 'application/json'
            })
        })
        const status = await response.status
        if (status == 200) {
            dispatch({ type: constants.newOrder, order: order })
            return true
        }
        else return false
    }
}

export const reducer: Reducer<types.orders> = (state: types.orders, incomingAction: Action) => {
    const action = incomingAction as any
    switch (action.type) {
        case constants.getOrders:
            return { ...state, orders: action.orders }
        case constants.newOrder:
            return { ...state, orders: state.orders.concat(action.order) }
    }
    return state || unloadedState
}