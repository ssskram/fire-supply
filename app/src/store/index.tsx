import * as user from './user'
import * as types from './types'
import * as messages from './messages'
import * as userProfile from './userProfile'

export interface ApplicationState {
    user: types.user,
    messages: types.messsage,
    userProfile: types.userProfile
}

export const reducers = {
    user: user.reducer,
    messages: messages.reducer,
    userProfile: userProfile.reducer
}

export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}