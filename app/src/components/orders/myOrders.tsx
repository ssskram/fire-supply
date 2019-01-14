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
import ViewOrder from './markup/viewOrder'
import { narcanContainer } from '../cart/style'

type props = {
    orders: types.order[]
    user: types.user
    userProfile: types.userProfile
}

type state = {
    viewOrder: types.order
}

export class MyOrders extends React.Component<props, state> {
    constructor(props) {
        super(props)
        this.state = {
            viewOrder: undefined
        }
    }

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
                        return (
                            <Card
                                onClick={(order) => this.setState({ viewOrder: order })}
                                key={key}
                                order={order}
                            />
                        )
                    })
                }
                {myOrders.length == 0 &&
                    <NoOrders />
                }
                {this.state.viewOrder &&
                    <ViewOrder
                        order={this.state.viewOrder}
                        closeView={() => this.setState({ viewOrder: undefined })}
                    />}
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