import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import * as Ping from '../../store/ping';

export class MyOrders extends React.Component<any, any> {

    componentDidMount() {
        window.scrollTo(0, 0)

        // ping server
        this.props.ping()
    }

    public render() {
        return <div className="home-container">
            <h1>Return my orders</h1>
        </div>;
    }
}

export default connect(
    (state: ApplicationState) => ({
        ...state.ping
    }),
    ({
        ...Ping.actionCreators
    })
)(MyOrders as any) as typeof MyOrders;