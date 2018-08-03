import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import * as OrdersStore from '../../store/orders';
import Spinner from '../Utilities/Spinner'
import OrderFilters from '../Filters/OrderFilter';

export class AllOrders extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            allOrders: this.props.orders,
            countOrders: 'All',
            viewFormat: 'cards'
        }
    }
    
    filter(state) {
        console.log(state)
    }

    toggleViewFormat(type) {
        console.log(type)
    }

    public render() {
        const {
            countOrders,
            allOrders
        } = this.state

        return <div>
            <OrderFilters all={true} toggleViewFormat={this.toggleViewFormat.bind(this)} countOrders={countOrders} filter={this.filter.bind(this)} />
            <br />
            <br />
            <br />
            <h1 className='text-center'>( All orders returned here )</h1>
            {/* {allOrders.length == 0 &&
                <Spinner notice='...loading the orders...' />
            } */}
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