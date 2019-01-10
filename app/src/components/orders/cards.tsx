import * as React from 'react'
import * as types from '../../store/types'

type props = {
    orders: types.orders
}

export default class Orders extends React.Component<props, any> {

    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
    }

    render() {
        return (
            <div>
                AllOrders
            </div>
        )
    }
}