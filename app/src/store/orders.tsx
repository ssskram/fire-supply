import { Action, Reducer } from 'redux'
import { AppThunkAction } from '.'
import * as constants from './constants'
import * as types from './types'
import * as moment from 'moment'

const unloadedState: types.orders = {
    orders: []
}

export const actionCreators = {
    loadOrders: (): AppThunkAction<any> => (dispatch) => {
        fetch("https://mongo-proxy.azurewebsites.us/get/allOrders", {
            method: 'get',
            headers: new Headers({
                'Authorization': 'Bearer ' + process.env.REACT_APP_MONGO
            })

        })
            .then(res => res.json())
            .then(data => dispatch({ type: constants.getOrders, orders: data }))
    },
    newOrder: (order): AppThunkAction<any> => async (dispatch) => {
        const response = await fetch('https://mongo-proxy.azurewebsites.us/save/newOrder', {
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
    },
    updateOrder: (order): AppThunkAction<any> => async (dispatch) => {
        const response = await fetch('https://mongo-proxy.azurewebsites.us/save/updateOrder', {
            method: 'POST',
            body: JSON.stringify(order),
            headers: new Headers({
                'Authorization': 'Bearer ' + process.env.REACT_APP_MONGO,
                'Content-Type': 'application/json'
            })
        })
        const status = await response.status
        if (status == 200) {
            dispatch({ type: constants.updateOrder, order: order })
            return true
        }
        else return false
    }
}

export const reducer: Reducer<types.orders> = (state: types.orders, incomingAction: Action) => {
    const action = incomingAction as any
    switch (action.type) {
        case constants.getOrders:
            return { ...state, orders: action.orders.sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) }
        case constants.newOrder:
            return { ...state, orders: state.orders.concat(action.order).sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) }
        case constants.updateOrder:
            return {
                ...state,
                orders: state.orders.map(order => order._id == action.order._id ? {
                    ...order,
                    _id: action.order._id,
                    user: action.order.user,
                    userName: action.order.userName,
                    department: action.order.department,
                    location: action.order.location,
                    comments: action.order.comments,
                    emergencyOrder: action.order.emergencyOrder,
                    emergencyJustification: action.order.emergencyJustification,
                    narcanCases: action.order.narcanCases,
                    narcanAdministeredUnknown: action.order.narcanAdministeredUnknown,
                    miscItems: action.order.miscItems,
                    supplies: action.order.supplies,
                    status: action.order.status,
                    supplyComments: action.order.supplyComments,
                    receivedBy: action.order.receivedBy,
                    createdAt: action.order.createdAt,
                    _v: action.order._v
                } : order
                ).sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            }
    }
    return state || unloadedState
}