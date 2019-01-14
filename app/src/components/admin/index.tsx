import * as React from 'react'
import HydrateStore from '../utilities/hydrateStore'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { ApplicationState } from '../../store'
import * as types from '../../store/types'
import * as orders from '../../store/orders'
import * as userProfile from '../../store/userProfile'
import Card from '../orders/markup/card'
import NoOrders from '../orders/markup/noOrders'
import ModifyOrder from './modifyOrder'

type props = {
    orders: types.order[],
    userProfile: types.userProfile
}

type state = {
    redirect: boolean
    modifyOrder: types.order
}

export class Admin extends React.Component<props, state> {
    constructor(props) {
        super(props)
        this.state = {
            redirect: false,
            modifyOrder: undefined
        }
    }

    componentDidMount() {
        this.checkPermissions(this.props.userProfile)
    }

    componentWillReceiveProps(nextProps) {
        this.checkPermissions(nextProps.userProfile)
    }

    checkPermissions(userProfile: types.userProfile) {
        if (userProfile.isAdmin == false) {
            this.setState({ redirect: true })
        }
    }

    render() {
        const ordersByDept = this.props.orders.filter(order => order.department == this.props.userProfile.department)

        if (this.state.redirect) {
            return <Redirect push to={'/'} />
        }

        return (
            <div className='col-md-12'>
                <h3>{this.props.userProfile.department} <b>ADMIN</b></h3>
                <hr />
                <HydrateStore />
                {ordersByDept.length > 0 &&
                    ordersByDept.map((order, key) => {
                        return (
                            <Card
                                onClick={(order) => this.setState({ modifyOrder: order })}
                                key={key}
                                order={order}
                            />
                        )
                    })
                }
                {ordersByDept.length == 0 &&
                    <NoOrders />
                }
                {this.state.modifyOrder &&
                    <ModifyOrder
                        order={this.state.modifyOrder}
                        closeView={() => this.setState({ modifyOrder: undefined })}
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
)(Admin as any)