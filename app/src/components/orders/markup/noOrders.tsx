import * as React from 'react'
import { Cat } from 'react-kawaii'

export default class NoOrders extends React.Component<{}, {}> {

    render() {
        return (
            <div className='col-md-12 text-center' style={{ margin: '60px 0px' }}>
            <Cat size={200} mood="shocked" color="#AED3E5" />
            <div className='alert alert-info' style={{ maxWidth: '650px', margin: '0 auto' }}>
                <h3>No orders to show here</h3>
            </div>
        </div>
        )
    }
}