import * as React from 'react'
import { connect } from 'react-redux'
import { ApplicationState } from '../store'
import * as Ping from '../store/ping'
import * as MessagesStore from '../store/messages'
import Messages from './Utilities/Messages'
import AllOrders from './Track/AllOrders'
import * as ItemsStore from '../store/items'
import * as Cart from '../store/cart'
import * as Orders from '../store/orders'

export class Home extends React.Component<any, any> {
    constructor() {
        super();
        this.state = {
            loadingData: true
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0)

        // ping server
        this.props.ping()

        // load orders
        this.props.loadOrders()

        // load inventory items
        this.props.getItems()

        // load cart items
        this.props.loadCart()
    }

    componentWillUnmount() {
        this.props.clear()
    }


    public render() {
        return <div className="home-container">
            <div className='text-center'>
                <Messages messages={this.props.messages} />
            </div>
            <AllOrders orders={this.props.orders}/>
        </div>;
    }
}

export default connect(
    (state: ApplicationState) => ({
        ...state.messages,
        ...state.ping,
        ...state.items,
        ...state.cart,
        ...state.orders
    }),
    ({
        ...MessagesStore.actionCreators,
        ...Ping.actionCreators,
        ...ItemsStore.actionCreators,
        ...Cart.actionCreators,
        ...Orders.actionCreators
    })
)(Home as any) as typeof Home;