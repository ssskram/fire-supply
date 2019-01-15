import * as React from 'react'
import HydrateStore from '../utilities/hydrateStore'
import { connect } from 'react-redux'
import { ApplicationState } from '../../store'
import * as types from '../../store/types'
import * as orders from '../../store/orders'
import * as userProfile from '../../store/userProfile'
import Card from './markup/card'
import NoOrders from './markup/noOrders'
import ViewOrder from './markup/viewOrder'
import Filters from './markup/filters'

type props = {
    orders: types.order[],
    userProfile: types.userProfile
}

type state = {
    ordersByDept: types.order[]
    viewOrder: types.order
}

export class AllOrders extends React.Component<props, state> {
    constructor(props) {
        super(props)
        this.state = {
            ordersByDept: props.orders.filter(order => order.department == props.userProfile.department),
            viewOrder: undefined
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            ordersByDept: nextProps.orders.filter(order => order.department == nextProps.userProfile.department),
        })
    }

    filter(filteredOrders) {
        this.setState({
            ordersByDept: filteredOrders
        })
    }

    render() {
        const { ordersByDept } = this.state

        return (
            <div className='col-md-12'>
                <h3>
                    <b>ALL ORDERS</b>
                    <span className='pull-right'>{this.props.userProfile.department}</span>
                </h3>
                <hr />
                <HydrateStore />
                <Filters
                    orders={this.props.orders.filter(order => order.department == this.props.userProfile.department)}
                    filter={this.filter.bind(this)}
                />
                {ordersByDept.length > 0 &&
                    ordersByDept.map((order, key) => {
                        return (
                            <Card
                                onClick={(order) => this.setState({ viewOrder: order })}
                                key={key}
                                order={order}
                            />
                        )
                    })
                }
                {ordersByDept.length == 0 &&
                    <NoOrders />
                }
                {this.state.viewOrder &&
                    <ViewOrder
                        order={this.state.viewOrder}
                        closeView={() => this.setState({ viewOrder: undefined })}
                    />
                }
            </div>
        )
    }
}

export default connect(
    (state: ApplicationState) => ({
        ...state.orders,
        ...state.userProfile
    }),
    ({
        ...orders.actionCreators,
        ...userProfile.actionCreators
    })
)(AllOrders as any)