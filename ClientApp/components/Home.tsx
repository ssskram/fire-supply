import * as React from 'react';
import { connect } from 'react-redux';
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
            <img src='./images/fire.png' style={imgStyle} className="img-responsive center-block home-image" />
            <div className='text-center'>
                <h1 className='hidden-xs'>Pittsburgh Bureau of Fire</h1>
                <h1><b>Supply Portal</b></h1>
                <div className="row text-center">
                    <Messages messages={this.props.messages} />
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