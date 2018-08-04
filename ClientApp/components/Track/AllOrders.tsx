import * as React from 'react'
import { connect } from 'react-redux'
import { ApplicationState } from '../../store'
import * as OrdersStore from '../../store/orders'
import * as User from '../../store/user'
import Spinner from '../Utilities/Spinner'
import OrderFilters from '../Filters/OrderFilter'
import Orders from './Orders'

export class AllOrders extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            orders: this.props.orders,
            viewFormat: 'cards',
            onFilter: false,
            allOrMine: 'All'
        }
    }

    componentDidMount() {
        this.props.loadOrders()
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.onFilter == false) {
            this.setState({
                orders: nextProps.orders
            })
        }
    }

    mine() {
        this.setState({
            onFilter: true,
            allOrMine: 'Mine',
            orders: this.props.orders.filter(order => order.user == this.props.user)
        })
    }

    all() {
        this.setState({
            onFilter: false,
            allOrMine: 'All',
            orders: this.props.orders
        })
    }

    filter(state) {
        this.setState({
            onFilter: true
        })
        console.log(state)
    }

    toggleViewFormat(type) {
        this.setState({
            viewFormat: type
        })
    }

    public render() {
        const {
            viewFormat,
            orders,
            onFilter,
            allOrMine
        } = this.state

        return <div>
            <OrderFilters
                mine={this.mine.bind(this)}
                all={this.all.bind(this)}
                allOrMine={allOrMine}
                count={orders.length}
                toggleViewFormat={this.toggleViewFormat.bind(this)}
                filter={this.filter.bind(this)} />
            <Orders
                orders={orders}
                viewFormat={viewFormat} />
            <div>
                {orders.length == 0 && onFilter == false &&
                    <Spinner notice='...loading the orders...' />
                }
            </div>
        </div>;
    }
}

export default connect(
    (state: ApplicationState) => ({
        ...state.orders,
        ...state.user
    }),
    ({
        ...OrdersStore.actionCreators,
        ...User.actionCreators
    })
)(AllOrders as any) as typeof AllOrders;