import * as React from 'react'
import * as types from '../../../store/types'
import * as moment from 'moment'
import countItems from '../functions/returnCountItems'
import orderTypes from '../functions/returnOrderTypes'

type props = {
    order: types.order
}

export default class Orders extends React.Component<props, any> {

    render() {
        const { order } = this.props
        let lastSix
        if (order._id) { lastSix = order._id.substr(order._id.length - 6) }
        else { lastSix = '...loading' }
        return (
            <div className='row text-center'>
                <div className='panel panel-button'>
                    <div className='panel-body'>
                        <div className='row'>
                            <div className='col-sm-4'>
                                {order.emergencyOrder &&
                                    <div style={{ color: 'red', fontSize: '1.2em' }}><b>EMERGENCY</b></div>
                                }
                                <div>{moment(order.createdAt).format('MM/DD/YYYY hh:mm A')}</div>
                                <div>{order.userName}</div>
                            </div>
                            <div className='col-sm-4'>
                                <div style={{ fontSize: '1.3em' }}><b>House: {order.location}</b></div>
                                <div>{countItems(order)} Items</div>
                                <div><i>{orderTypes(order)}</i></div>
                            </div>
                            <div className='col-sm-4'>
                                <div>Order #{lastSix}</div>
                                <div><b>Status</b></div>
                                <div>{order.status}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}