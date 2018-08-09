import * as React from 'react'
import { connect } from 'react-redux'
import { ApplicationState } from '../../store'
import * as OrdersStore from '../../store/orders'
import * as User from '../../store/user'
import Spinner from '../Utilities/Spinner'
import OrderFilters from '../Filters/OrderFilter'
import Orders from './Orders'
import Format from 'date-format'

export class AllOrders extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            orders: this.props.orders,
            viewFormat: 'cards',
            filterState: {},
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
        }, function (this) {
            this.filter(this.state.filterState)
        })
    }

    all() {
        this.setState({
            onFilter: false,
            allOrMine: 'All',
            orders: this.props.orders,
            filterState: {}
        }, function (this) {
            this.filter(this.state.filterState)
        })
    }

    filter(state) {
        if (state.house) {
            var house = state.house.toLowerCase()
        }
        if (state.status) {
            var status = state.status.toLowerCase()
        }
        if (state.orderDate) {
            var date = new Date(state.orderDate)
            var orderDate = Format('MM/dd/yyyy', date)
        }
        if (state.itemsOrdered) {
            var itemsOrdered = state.itemsOrdered.toLowerCase()
        }
        var filtered = this.props.orders.filter(function (item) {
            if (house) {
                if (!item.house.toLowerCase().includes(house)) {
                    return false
                }
            }
            if (status) {
                if (!item.status.toLowerCase().includes(status)) {
                    return false
                }
            }
            if (orderDate) {
                var incomingDate = new Date(item.orderSubmitted)
                var formattedDate = Format('MM/dd/yyyy', incomingDate)
                if (!formattedDate.includes(orderDate)) {
                    return false
                }
            }
            if (itemsOrdered) {
                if (!item.orderType.toLowerCase().includes(itemsOrdered)) {
                    return false
                }
            }
            return true
        })
        if (this.state.allOrMine == 'All') {
            this.setState({
                orders: filtered,
                onFilter: true,
                filterState: state
            })
        }
        else {
            this.setState({
                orders: filtered.filter(order => order.user == this.props.user),
                onFilter: true,
                filterState: state
            })
        }
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
            filterState,
            allOrMine
        } = this.state

        return <div>
            <OrderFilters
                mine={this.mine.bind(this)}
                all={this.all.bind(this)}
                filterState={filterState}
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