
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
    loadUserProfile: (user): AppThunkAction<any> => async (dispatch) => {
        const response = await fetch("https://mongo-proxy.azurewebsites.us/get/userProfile?user=" + user.email, {
            method: 'get',
            headers: new Headers({
                'Authorization': 'Bearer ' + process.env.REACT_APP_MONGO
            })
        })
        if (response.status != 404) {
            const profile = await response.json()
            dispatch({
                type: constants.setDepartment, newDepartment: profile.department
            })
            return profile
        } else return undefined
    },
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
    setUserProfile: (profile): AppThunkAction<any> => (dispatch) => {
        fetch('https://mongo-proxy.azurewebsites.us/save/userProfile', {
            method: 'POST',
            body: JSON.stringify(profile),
            headers: new Headers({
                'Authorization': 'Bearer ' + process.env.REACT_APP_MONGO,
                'Content-Type': 'application/json'
            })
        })
        dispatch({ type: constants.setDepartment, newDepartment: profile.department })
    },
    updateCart: (newCart): AppThunkAction<any> => (dispatch) => {
        console.log(newCart)
        // fetch('https://mongo-proxy.azurewebsites.us/save/updateCart', {
        //     method: 'POST',
        //     body: JSON.stringify(newCart),
        //     headers: new Headers({
        //         'Authorization': 'Bearer ' + process.env.REACT_APP_MONGO,
        //         'Content-Type': 'application/json'
        //     })
        // })
        dispatch({ type: constants.updateCart, newCart: newCart })
    }
}

export const reducer: Reducer<types.userProfile> = (state: any, incomingAction: Action) => {
    const action = incomingAction as any
    switch (action.type) {
        case constants.setDepartment:
            return {
                ...state,
                userProfile: {
                    isAdmin: state.userProfile.isAdmin,
                    department: action.newDepartment,
                    cart: state.userProfile.cart
                }
            }
        case constants.setAdminStatus:
            return {
                ...state,
                userProfile: {
                    isAdmin: action.adminStatus,
                    department: state.userProfile.department,
                    cart: state.userProfile.cart
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