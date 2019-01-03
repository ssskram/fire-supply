
// hydrates the wholeeeeee store

import * as React from 'react'
import { connect } from 'react-redux'
import { ApplicationState } from '../../store'
import * as types from '../../store/types'
import * as user from '../../store/user'
import * as items from '../../store/items'

type props = {
    user: types.user
    items: types.items
    loadItems: () => void
}

class Hydrate extends React.Component<props, {}> {

    componentDidMount() {
        this.props.loadItems()
    }

    public render() { return null }
}

export default connect(
    (state: ApplicationState) => ({
        ...state.user,
        ...state.items
    }),
    ({
        ...user.actionCreators,
        ...items.actionCreators
    })
)(Hydrate as any)