
import { Action, Reducer } from 'redux'
import { AppThunkAction } from '.'
import * as constants from './constants'
import * as types from './types'

const unloadedState: types.userProfile = {
    department: ''
}

export const actionCreators = {
    loadUserProfile: (user): AppThunkAction<any> => async (dispatch) => {

        // get from mongo here

        const userProfile = {}
        dispatch({ type: constants.loadUserProfile, userProfile: userProfile })
    },
    setUserProfile: (profile): AppThunkAction<any> => async (dispatch) => {

        // set from mongo here

        const userProfile = {}
        dispatch({ type: constants.setUserProfile, userProfile: userProfile })
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