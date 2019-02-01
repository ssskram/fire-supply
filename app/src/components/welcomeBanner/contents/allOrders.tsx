import * as React from 'react'

export default class AllOrders extends React.Component<any, any> {

    public render() {
        return <div>
            <h3><b>These are all of the orders</b></h3>
            <div style={{ marginTop: '20px' }}>
                <h4>All orders placed within the {this.props.department}.  You can filter them by recipient, or by status.</h4>
            </div>
        </div>
    }
}