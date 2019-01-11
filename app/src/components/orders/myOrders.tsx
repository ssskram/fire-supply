import * as React from 'react'
import Messages from '../utilities/messages'
import HydrateStore from '../utilities/hydrateStore'
import { connect } from 'react-redux'
import { ApplicationState } from '../../store'
import * as types from '../../store/types'
import * as orders from '../../store/orders'
import * as user from '../../store/user'
import * as userProfile from '../../store/userProfile'
import Card from './markup/card'
import NoOrders from './markup/noOrders'

type props = {
    orders: types.order[]
    user: types.user
    userProfile: types.userProfile
}

export class MyOrders extends React.Component<props, any> {

    render() {
        const myOrders = this.props.orders.filter(order => {
            return (order.user == this.props.user.email) && (order.department == this.props.userProfile.department)
        })

        return (
            <div className='col-md-12'>
                <h3>My Orders</h3>
                <hr />
                <Messages />
                <HydrateStore />
                {myOrders.length > 0 &&
                    myOrders.map((order, key) => {
                        <Card
                            key={key}
                            order={order}
                        />
                    })
                } : { <NoOrders /> }
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