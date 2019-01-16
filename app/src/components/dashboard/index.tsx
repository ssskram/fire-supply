import * as React from 'react'
import HydrateStore from '../utilities/hydrateStore'
import { connect } from 'react-redux'
import { ApplicationState } from '../../store'
import * as items from '../../store/items'
import * as orders from '../../store/orders'
import * as types from '../../store/types'
import * as userProfile from '../../store/userProfile'
import ScatterPlot from './plot'
import Filters from './filters'

type props = {
    items: types.item[]
    orders: types.order[]
    userProfile: types.userProfile
}

type state = {
    item: string
    recipient: string
}

export class Dashbard extends React.Component<props, state> {
    constructor(props) {
        super(props)
        this.state = {
            item: 'Toilet Paper',
            recipient: undefined
        }
    }

    render() {
        return (
            <div>
                <HydrateStore />
                <h3 style={{ textTransform: 'uppercase' }}>{this.state.item} Dashboard</h3>
                <hr />
                <Filters
                    state={this.state}
                    setState={this.setState.bind(this)}
                    items={this.props.items}
                />
                <ScatterPlot
                    orders={this.props.orders.filter(order => order.department == this.props.userProfile.department)}
                    items={this.props.items}
                    recipient={this.state.recipient}
                    item={this.state.item}
                />
            </div>
        )
    }
}

export default connect(
    (state: ApplicationState) => ({
        ...state.orders,
        ...state.items,
        ...state.userProfile
    }),
    ({
        ...orders.actionCreators,
        ...items.actionCreators,
        ...userProfile.actionCreators
    })
)(Dashbard as any)