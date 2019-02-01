import * as React from 'react'

export default class MyOrders extends React.Component<{}, {}> {

    public render() {
        return <div>
            <h3><b>These are your orders</b></h3>
            <div style={{ marginTop: '20px' }}>
                <h4>Track them from submission through delivery.</h4>
            </div>
        </div>
    }
}