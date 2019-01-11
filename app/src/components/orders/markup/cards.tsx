import * as React from 'react'
import * as types from '../../../store/types'
import NoOrders from './noOrders'
import * as moment from 'moment'

type props = {
    orders: types.order[]
}

export default class Orders extends React.Component<props, any> {

    render() {
        return (
            <div className='col-md-12'>
                {this.props.orders.length > 0 &&
                    this.props.orders.map((order, key) => {
                        console.log(order)
                        let lastSix
                        if (order._id) { lastSix = order._id.substr(order._id.length - 6) }
                        else { lastSix = '...loading' }
                        return (
                            <div key={key} className='row text-center'>
                                <div className='panel panel-button'>
                                    <div className='panel-body'>
                                        <div className='row'>
                                            <div className='col-sm-4'>
                                                <div>Order #{lastSix}</div>
                                                <div>{moment(order.createdAt).format('MM/DD/YYYY hh:mm A')}</div>
                                                <div>{order.userName}</div>
                                            </div>
                                            <div className='col-sm-4' style={{ fontSize: '1.3em' }}>
                                                {order.emergencyOrder &&
                                                    <div style={{ color: 'red' }}>EMERGENCY</div>
                                                }
                                                <div>House: {order.location}</div>
                                                <div>Items: {order.supplies.length}</div>
                                            </div>
                                            <div className='col-sm-4'>
                                                <div><b>Status</b></div>
                                                <div>{order.status}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
                {this.props.orders.length == 0 &&
                    <NoOrders />
                }

            </div>
        )
    }
}