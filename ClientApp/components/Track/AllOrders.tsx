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
            countOrders: 'All',
            viewFormat: 'cards'
        }
    }

    componentDidMount() {
        this.props.loadOrders()
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps.orders)
        if (nextProps.orders) {
            this.setState({
                countOrders: nextProps.orders.length
            })
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
            countOrders
        } = this.state

        const {
            orders
        } = this.props

        return <div>
            <OrderFilters all={true} toggleViewFormat={this.toggleViewFormat.bind(this)} countOrders={countOrders} filter={this.filter.bind(this)} />
            <br />
            <br />
            <br />
            <h1 className='text-center'>( All orders returned here )</h1>
            {orders &&
                <div>
                    {orders.length == 0 &&
                        <Spinner notice='...loading the orders...' />
                    }
                </div>
            }
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