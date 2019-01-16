import * as React from 'react'
import HydrateStore from '../utilities/hydrateStore'
import { connect } from 'react-redux'
import { ApplicationState } from '../../store'
import * as items from '../../store/items'
import * as orders from '../../store/orders'
import * as types from '../../store/types'
import ScatterPlot from './scatter'
import Filters from './filters'

type props = {
    items: types.item[]
    orders: types.order[]
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
                <h3 style={{ textTransform: 'uppercase' }}>Toilet Paper Dashboard</h3>
                <hr />
                <Filters
                    state={this.state}
                    setState={this.setState.bind(this)}
                    items={this.props.items}
                />
                <ScatterPlot orders={this.props.orders} />
            </div>
        )
    }
}

export default connect(
    (state: ApplicationState) => ({
        ...state.orders,
        ...state.items
    }),
    ({
        ...orders.actionCreators,
        ...items.actionCreators
    })
)(Dashbard as any)