import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ApplicationState } from '../store';
import * as Ping from '../store/ping';
import * as MessagesStore from '../store/messages';
import Messages from './Messages';

const imgStyle = {
    minHeight: '200px'
}

export class Home extends React.Component<any, any> {

    componentDidMount() {
        window.scrollTo(0, 0)

        // ping server
        this.props.ping()
    }

    componentWillUnmount() {
        this.props.clear()
    }

    public render() {
        return <div className="home-container">
            <img src='./images/fire.webp' style={imgStyle} className="img-responsive center-block home-image" />
            <div className='text-center'>
                <h1>Pittsburgh Bureau of Fire</h1>
                <h1><b>Supply Portal</b></h1>
                <div className="row text-center">
                    <Messages messages={this.props.messages} />
                </div>
                <hr />
            </div>
            <div className='row'>
                <div className='col-md-6 text-center'>
                    <Link to={'/MyOrders'} type="button" title="My orders" className="btn btn-big">
                        <i className="glyphicon glyphicon-list home-icon"></i><br />
                        <div className="hidden-md">My Orders</div>
                        <div className="hidden-xs hidden-sm hidden-lg">My</div>
                    </Link>
                </div>
                <div className='col-md-6 text-center'>
                    <Link to={'/AllOrders'} type="button" title="All orders" className="btn btn-big">
                        <i className="glyphicon glyphicon-list home-icon"></i><br />
                        <div className="hidden-md">All Orders</div>
                        <div className="hidden-xs hidden-sm hidden-lg hidden-xl">All</div>
                    </Link>
                </div>
            </div>
        </div>;
    }
}

export default connect(
    (state: ApplicationState) => ({
        ...state.messages,
        ...state.ping
    }),
    ({
        ...MessagesStore.actionCreators,
        ...Ping.actionCreators
    })
)(Home as any) as typeof Home;