import * as React from 'react'
import * as types from '../../store/types'
import NoOrders from './noOrders'

type props = {
    orders: types.order[]
}

export default class Orders extends React.Component<props, any> {

    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
    }

    render() {
        return (
            <div>
                {this.props.orders.length > 0 &&
                    this.props.orders.map((order, key) => {
                        var lastSix = order._id.substr(order._id.length - 6)
                        return (
                            <div key={key} className='row text-center'>
                                <div className='panel'>
                                    <div className='panel-body'>
                                        {lastSix}
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