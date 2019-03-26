import * as React from 'react'
import { Cat } from 'react-kawaii'
import * as style from '../style'

export default class NoOrders extends React.Component<{}, {}> {

    render() {
        return (
            <div className='col-md-12 text-center' style={style.noOrdersMargin}>
                <Cat size={200} mood="shocked" color="#AED3E5" />
                <div className='alert alert-info' style={style.noOrdersAlert}>
                    <h3>No orders to show here</h3>
                </div>
            </div>
        )
    }
}