
// hydrates the wholeeeeee store

import * as React from 'react'
import { connect } from 'react-redux'
import { ApplicationState } from '../../store'
import * as types from '../../store/types'
import * as user from '../../store/user'
import * as items from '../../store/items'
import * as orders from '../../store/orders'

type props = {
    user: types.user
    items: types.items
    loadItems: () => void
    loadOrders: () => void
}

class Hydrate extends React.Component<props, {}> {

    componentDidMount() {
        this.props.loadItems()
        this.props.loadOrders()
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
    }

    public render() { return null }
}

export default connect(
    (state: ApplicationState) => ({
        ...state.user,
        ...state.items,
        ...state.orders
    }),
    ({
        ...user.actionCreators,
        ...items.actionCreators,
        ...orders.actionCreators
    })
)(Hydrate as any)