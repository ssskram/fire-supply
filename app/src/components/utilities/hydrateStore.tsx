
// hydrates the wholeeeeee store

import * as React from 'react'
import { connect } from 'react-redux'
import { ApplicationState } from '../../store'
import * as types from '../../store/types'
import * as user from '../../store/user'
import * as userProfile from '../../store/userProfile'

type props = {
    loadUser: () => types.user
    loadUserProfile: (object: types.user) => void
    setUserProfile: (object: types.userProfile) => void
}

class Hydrate extends React.Component<props, {}> {

    async componentDidMount() {
        const user = await this.props.loadUser()
        this.props.loadUserProfile(user)        

        // testing set
        this.props.setUserProfile({ department: "Bureau of Fire" })
    }

    public render() { return null }
}

export default connect(
    (state: ApplicationState) => ({
        ...state.user,
        ...state.userProfile
    }),
    ({
        ...user.actionCreators,
        ...userProfile.actionCreators
    })
)(Hydrate as any)