import * as React from 'react'
import HydrateStore from '../utilities/hydrateStore'
import { connect } from 'react-redux'
import { ApplicationState } from '../../store'
import * as types from '../../store/types'
import * as orders from '../../store/orders'
import * as userProfile from '../../store/userProfile'
import Card from './markup/card'
import NoOrders from './markup/noOrders'


type props = {
    orders: types.order[],
    userProfile: types.userProfile
}

export class AllOrders extends React.Component<props, any> {

    render() {
        const ordersByDept = this.props.orders.filter(order => order.department == this.props.userProfile.department)

        return (
            <div className='col-md-12'>
                <h3>{this.props.userProfile.department}</h3>
                <hr />
                <HydrateStore />
                {ordersByDept.length > 0 &&
                    ordersByDept.map((order, key) => {
                        <Card
                            key={key}
                            order={order}
                        />
                    })
                } : {<NoOrders />}
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