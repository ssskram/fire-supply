import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import * as OrdersStore from '../../store/orders';
import OrderFilters from '../Filters/OrderFilter';

export class AllOrders extends React.Component<any, any> {
    constructor() {
        super();
        this.state = {
            countOrders: 'All',
            viewFormat: 'cards'
        }
    }

    componentDidMount() {
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
            <OrderFilters all={true} toggleViewFormat={this.toggleViewFormat.bind(this)} countOrders={countOrders} filter={this.filter.bind(this)}/>
            <h1>Return all orders</h1>
        </div>;
    }
}

export default connect(
    (state: ApplicationState) => ({
        ...state.orders
    }),
    ({
        ...OrdersStore.actionCreators
    })
)(AllOrders as any) as typeof AllOrders;