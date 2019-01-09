
import { Action, Reducer } from 'redux'
import { AppThunkAction } from '.'
import * as constants from './constants'
import * as types from './types'

const unloadedState = {
    userProfile: {
        department: '...loading',
        isAdmin: false,
        cart: []
    } as types.userProfile
}

export const actionCreators = {
    isUserAdmin: (user): AppThunkAction<any> => async (dispatch) => {
        const response = await fetch("https://365proxy.azurewebsites.us/pghsupply/isAdmin?user=" + user.email, {
            method: 'get',
            headers: new Headers({
                'Authorization': 'Bearer ' + process.env.REACT_APP_365_PROXY
            })
        })
        const adminStatus = await response.json()
        dispatch({ type: constants.setAdminStatus, adminStatus: adminStatus.isAdmin })
    },
    loadUserProfile: (user): AppThunkAction<any> => async (dispatch) => {
        const response = await fetch("http://localhost:3000/get/userProfile?user=" + user.email, {
            method: 'get',
            headers: new Headers({
                'Authorization': 'Bearer ' + process.env.REACT_APP_MONGO
            })
        })
        if (response.status != 404) {
            const profile = await response.json()
            dispatch({
                type: constants.setProfile, userProfile: profile
            })
            return profile
        } else return undefined
    },
    setUserProfile: (profile): AppThunkAction<any> => (dispatch) => {
        fetch('http://localhost:3000/save/userProfile', {
            method: 'POST',
            body: JSON.stringify(profile),
            headers: new Headers({
                'Authorization': 'Bearer ' + process.env.REACT_APP_MONGO,
                'Content-Type': 'application/json'
            })
        })
        dispatch({ type: constants.setProfile, userProfile: profile })
    },
    updateCart: (newProfile): AppThunkAction<any> => async (dispatch, getState) => {
        fetch('http://localhost:3000/save/cart', {
            method: 'POST',
            body: JSON.stringify(newProfile),
            headers: new Headers({
                'Authorization': 'Bearer ' + process.env.REACT_APP_MONGO,
                'Content-Type': 'application/json'
            })
        })
        dispatch({ type: constants.updateCart, newCart: newProfile.cart })
    }
}

export const reducer: Reducer<types.userProfile> = (state: any, incomingAction: Action) => {
    const action = incomingAction as any
    switch (action.type) {
        case constants.setAdminStatus:
            return {
                ...state,
                userProfile: {
                    isAdmin: action.adminStatus,
                    department: state.userProfile.department,
                    cart: state.userProfile.cart
                }
            }
        case constants.setProfile:
            return {
                ...state,
                userProfile: {
                    isAdmin: state.userProfile.isAdmin,
                    department: action.userProfile.department,
                    cart: action.userProfile.cart
                }
            }
        case constants.updateCart:
            return {
                ...state,
                userProfile: {
                    isAdmin: state.userProfile.isAdmin,
                    department: state.userProfile.department,
                    cart: action.newCart
                }
            }
    }
    return state || unloadedState
}