import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import * as Ping from '../../store/ping';
import * as OrdersStore from '../../store/orders';
import OrderFilters from '../Filters/OrderFilter';

export class MyOrders extends React.Component<any, any> {
    constructor() {
        super();
        this.state = {
            countOrders: 'My',
            viewFormat: 'cards'
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0)

        // ping server
        this.props.ping()
    }

    filter(state) {
        console.log(state)
    }

    toggleViewFormat(type) {
        console.log(type)
    }

    public render() {
        const {
            countOrders
        } = this.state

        return <div>
            <OrderFilters countOrders={countOrders} toggleViewFormat={this.toggleViewFormat.bind(this)} filter={this.filter.bind(this)}/>
            <h1>Return my orders</h1>
        </div>;
    }
}

export default connect(
    (state: ApplicationState) => ({
        ...state.ping,
        ...state.orders
    }),
    ({
        ...Ping.actionCreators,
        ...OrdersStore.actionCreators
    })
)(MyOrders as any) as typeof MyOrders;