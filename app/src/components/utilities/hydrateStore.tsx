
// hydrates the wholeeeeee store

import * as React from 'react'
import { connect } from 'react-redux'
import { ApplicationState } from '../../store'
import * as types from '../../store/types'
import * as user from '../../store/user'

type props = {
    user: types.user
}

class Hydrate extends React.Component<props, {}> {

    componentDidMount() {

    }

    public render() { return null }
}

export default connect(
    (state: ApplicationState) => ({
        ...state.user
    }),
    ({
        ...user.actionCreators
    })
)(Hydrate as any)