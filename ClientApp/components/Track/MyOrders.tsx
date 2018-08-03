import * as React from 'react'
import { connect } from 'react-redux'
import { ApplicationState } from '../../store'
import * as Ping from '../../store/ping'
import * as OrdersStore from '../../store/orders'
import OrderFilters from '../Filters/OrderFilter'
import Spinner from '../Utilities/Spinner'
import Orders from './Orders'

export class MyOrders extends React.Component<any, any> {
    constructor() {
        super();
        this.state = {
            countOrders: 'My',
            viewFormat: 'cards'
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.orders) {
            this.setState({
                countOrders: nextProps.orders.length
            })
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0)

        // ping server
        this.props.ping()

        // load orders
        this.props.loadOrders()
    }

    filter(state) {
        console.log(state)
    }

    toggleViewFormat(type) {
        this.setState({
            viewFormat: type
        })
    }

    public render() {
        const {
            countOrders,
            viewFormat
        } = this.state

        const {
            orders
        } = this.props

        return <div>
            <OrderFilters countOrders={countOrders} toggleViewFormat={this.toggleViewFormat.bind(this)} filter={this.filter.bind(this)} />
            {orders &&
                <Orders orders={orders} viewFormat={viewFormat} />
            }
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
        ...state.ping,
        ...state.orders
    }),
    ({
        ...Ping.actionCreators,
        ...OrdersStore.actionCreators
    })
)(MyOrders as any) as typeof MyOrders;