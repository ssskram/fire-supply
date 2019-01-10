import * as React from 'react'
import Messages from '../utilities/messages'
import HydrateStore from '../utilities/hydrateStore'
import { connect } from 'react-redux'
import { ApplicationState } from '../../store'
import * as types from '../../store/types'
import * as orders from '../../store/orders'
import * as user from '../../store/user'
import * as userProfile from '../../store/userProfile'
import Cards from './cards'

type props = {
    orders: any
    user: types.user
    userProfile: types.userProfile
}

export class MyOrders extends React.Component<props, any> {

    render() {
        return (
            <div>
                <Messages/>
                <HydrateStore />
                <Cards orders={this.props.orders.filter(order => {
                    return (order.user == this.props.user.email) && (order.department == this.props.userProfile.department)
                })} />
            </div>
        )
    }
}

export default connect(
    (state: ApplicationState) => ({
        ...state.orders,
        ...state.user,
        ...state.userProfile
    }),
    ({
        ...orders.actionCreators,
        ...user.actionCreators,
        ...userProfile.actionCreators
    })
)(MyOrders as any)