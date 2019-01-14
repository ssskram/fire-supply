import * as React from 'react'
import HydrateStore from '../utilities/hydrateStore'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { ApplicationState } from '../../store'
import * as types from '../../store/types'
import * as orders from '../../store/orders'
import * as messages from '../../store/messages'
import * as userProfile from '../../store/userProfile'
import Card from '../orders/markup/card'
import NoOrders from '../orders/markup/noOrders'
import ModifyOrder from './markup/modifyOrder'
import Messages from '../utilities/messages'
import Spinner from '../utilities/spinner'
import FilterButtons from './markup/filterButtons'
import Search from './markup/search'

type props = {
    orders: types.order[],
    userProfile: types.userProfile
    updateOrder: (newOrder) => boolean
    errorMessage: () => void
    clearMessage: () => void
}

type state = {
    orders: any[]
    filter: string
    search: string
    spinner: boolean
    redirect: boolean
    modifyOrder: types.order
}

export class Admin extends React.Component<props, state> {
    constructor(props) {
        super(props)
        this.state = {
            orders: props.orders.filter(order => order.department == props.userProfile.department),
            filter: 'all orders',
            search: '',
            spinner: false,
            redirect: false,
            modifyOrder: undefined
        }
    }

    componentDidMount() {
        this.checkPermissions(this.props.userProfile)
    }

    componentWillReceiveProps(nextProps, nextState) {
        this.checkPermissions(nextProps.userProfile)
        this.setState({
            orders: nextProps.orders.filter(order => order.department == nextProps.userProfile.department),
        })
    }

    checkPermissions(userProfile: types.userProfile) {
        if (userProfile.isAdmin == false) {
            this.setState({ redirect: true })
        }
    }

    componentWillUnmount() {
        this.props.clearMessage()
    }

    render() {
        if (this.state.redirect) {
            return <Redirect push to={'/'} />
        }

        return (
            <div className='col-md-12'>
                <HydrateStore />
                {this.state.spinner == true &&
                    <Spinner notice='...saving...' />
                }
                <Messages />
                <h3><b>SUPPLY WAREHOUSE</b> <span className='pull-right'>{this.props.userProfile.department}</span></h3>
                <hr />
                <FilterButtons filter={this.state.filter} setState={this.setState.bind(this)} allOrders={this.props.orders.filter(order => order.department == this.props.userProfile.department)} />
                <Search search={this.state.search} filter={this.state.filter} setState={this.setState.bind(this)} />
                {this.state.orders.length > 0 &&
                    this.state.orders.map((order, key) => {
                        return (
                            <Card
                                onClick={(order) => this.setState({ modifyOrder: order })}
                                key={key}
                                order={order}
                            />
                        )
                    })
                }
                {this.state.orders.length == 0 &&
                    <NoOrders />
                }
                {this.state.modifyOrder &&
                    <ModifyOrder
                        setState={this.setState.bind(this)}
                        order={this.state.modifyOrder}
                        closeView={() => this.setState({ modifyOrder: undefined, spinner: false })}
                        updateOrder={this.props.updateOrder.bind(this)}
                        errorMessage={this.props.errorMessage.bind(this)}
                    />
                }
            </div>
        )
    }
}

export default connect(
    (state: ApplicationState) => ({
        ...state.orders,
        ...state.userProfile,
        ...state.messages
    }),
    ({
        ...orders.actionCreators,
        ...userProfile.actionCreators,
        ...messages.actionCreators
    })
)(Admin as any)