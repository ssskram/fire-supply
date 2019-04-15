import { Action, Reducer } from 'redux'
import { AppThunkAction } from '.'
import * as constants from './constants'
import * as types from './types'
import ErrorHandler from '../functions/errorHandler'

const unloadedState: types.items = {
    items: []
}

export const actionCreators = {
    loadItems: (): AppThunkAction<any> => (dispatch) => {
            fetch("https://cartegraphapi-staging.azurewebsites.us/pghSupply/allItems", {
                method: 'get',
                headers: new Headers({
                    'Authorization': 'Bearer ' + process.env.REACT_APP_CART_API
                })
    
            })
                .then(res => res.json())
                .then(data => {
                    dispatch({ type: constants.getItems, items: data })
                })
                .catch(err => ErrorHandler(err))
    }
}

export const reducer: Reducer<types.items> = (state: types.items, incomingAction: Action) => {
    const action = incomingAction as any
    switch (action.type) {
        case constants.getItems:
            return { ...state, items: action.items }
    }
    return state || unloadedState
}