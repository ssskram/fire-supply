import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';

export class AllOrders extends React.Component<any, any> {

    componentDidMount() {
    }

    public render() {
        return <div className="home-container">
            <h1>Return all orders</h1>
        </div>;
    }
}

export default connect(
    (state: ApplicationState) => ({
    }),
    ({
    })
)(AllOrders as any) as typeof AllOrders;