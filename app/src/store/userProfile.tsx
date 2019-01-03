
import { Action, Reducer } from 'redux'
import { AppThunkAction } from '.'
import * as constants from './constants'
import * as types from './types'

const unloadedState = {
    userProfile: {
        department: '',
        isAdmin: false,
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
            const profileRecord = await response.json()
            const profile: types.userProfile = {
                department: profileRecord.department,
                isAdmin: false
            }
            dispatch({ type: constants.loadUserProfile, userProfile: profile })
            return profile
        } else return undefined
    },
    isUserAdmin: (user): AppThunkAction<any> => async (dispatch, getState) => {
        const response = await fetch("https://365proxy.azurewebsites.us/pghsupply/isAdmin?user=" + user.email, {
            method: 'get',
            headers: new Headers({
                'Authorization': 'Bearer ' + process.env.REACT_APP_365_PROXY
            })
        })
        const adminStatus = await response.json()
        if (adminStatus.isAdmin) {
            const up: any = getState().userProfile
            dispatch({
                type: constants.loadUserProfile, userProfile: {
                    department: up.userProfile.department,
                    isAdmin: adminStatus.isAdmin
                } as types.userProfile
            })
        }
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
        dispatch({ type: constants.setUserProfile, userProfile: profile })
    }
}

export const reducer: Reducer<types.userProfile> = (state: types.userProfile, incomingAction: Action) => {
    const action = incomingAction as any
    switch (action.type) {
        case constants.loadUserProfile:
            return { ...state, userProfile: action.userProfile }
        case constants.setUserProfile:
            return { ...state, userProfile: action.userProfile }
    }
    return state || unloadedState
}