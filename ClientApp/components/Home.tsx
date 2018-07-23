import * as React from 'react'
import { connect } from 'react-redux'
import { ApplicationState } from '../store'
import * as Ping from '../store/ping'
import * as MessagesStore from '../store/messages'
import Messages from './Utilities/Messages'
import AllOrders from './Track/AllOrders'
import * as ItemsStore from '../store/items'

export class Home extends React.Component<any, any> {
    constructor() {
        super();
        this.state = {
            loadingData: true
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0)

        if (this.props.items != null) {
            this.setState({
                loadingData: false
            })
        }
        // ping server
        this.props.ping()

        // load inventory items
        this.props.getItems()
    }

    componentWillUnmount() {
        this.props.clear()
    }

    componentWillReceiveProps (nextProps) {
        console.log(nextProps)
        if (nextProps.items != null) {
            this.setState({
                loadingData: false
            })
        }
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
        ...state.items
    }),
    ({
        ...MessagesStore.actionCreators,
        ...Ping.actionCreators,
        ...ItemsStore.actionCreators
    })
)(Home as any) as typeof Home;