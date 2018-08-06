import * as React from 'react'
import { connect } from 'react-redux'
import { ApplicationState } from '../store'
import * as Ping from '../store/ping'
import * as Houses from '../store/houses'
import * as ItemsStore from '../store/items'
import * as MessagesStore from '../store/messages'
import Messages from './Utilities/Messages'
import * as Cart from '../store/cart'
import AllOrders from './Track/AllOrders'

export class Home extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        window.scrollTo(0, 0)

        // load inventory
        this.props.getItems()

        // ping server
        this.props.ping()

        // load engine houses
        this.props.loadHouses()

        // load cart
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
            <AllOrders />
        </div>;
    }
}

export default connect(
    (state: ApplicationState) => ({
        ...state.messages,
        ...state.ping,
        ...state.items,
        ...state.cart,
        ...state.houses
    }),
    ({
        ...MessagesStore.actionCreators,
        ...Ping.actionCreators,
        ...ItemsStore.actionCreators,
        ...Cart.actionCreators,
        ...Houses.actionCreators
    })
)(Home as any) as typeof Home;