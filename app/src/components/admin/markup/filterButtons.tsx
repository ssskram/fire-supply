import * as React from 'react'
import * as style from '../style'
import * as types from '../../../store/types'

type props = {
    filter: string
    setFilter: (filter: string) => void
    allOrders: types.order[]
}

export default class filterButtons extends React.Component<props, {}> {

    returnAllCount() {
        return this.props.allOrders.length
    }

    returnEmergencyCount() {
        return this.props.allOrders.filter(order => order.emergencyOrder == true).length
    }

    returnOpenCount() {
        return this.props.allOrders.filter(order => order.status != 'Delivered' && order.status != 'Rejected').length
    }

    render() {
        return <div className='text-center row'>
            <div className='col-sm-4'>
                <button onClick={() => this.props.setFilter('all orders')} style={this.props.filter == 'all orders' ? style.buttonClicked : undefined} className='btn btn-filter grey'>
                    All Orders
                <div style={style.buttonNumbers}>{this.returnAllCount()}</div>
                </button>
            </div>
            <div className='col-sm-4'>
                <button onClick={() => this.props.setFilter('emergency orders')} style={this.props.filter == 'emergency orders' ? style.buttonClicked : undefined} className='btn btn-filter red'>
                    Emergency Orders
                <div style={style.buttonNumbers}>{this.returnEmergencyCount()}</div>
                </button>
            </div>
            <div className='col-sm-4'>
                <button onClick={() => this.props.setFilter('open orders')} style={this.props.filter == 'open orders' ? style.buttonClicked : undefined} className='btn btn-filter orange'>
                    Open Orders
                <div style={style.buttonNumbers}>{this.returnOpenCount()}</div>
                </button>
            </div>
        </div>
    }
}