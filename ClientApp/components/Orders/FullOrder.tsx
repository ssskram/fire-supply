import * as React from 'react'
import Moment from 'react-moment'

const padding = {
    padding: '15px'
}

const emergency = {
    border: '1px solid red'
}

export default class FullOrder extends React.Component<any, any> {
    constructor() {
        super();
    }

    public render() {
        const {
            order
        } = this.props

        return <div style={padding}>
            <h2>{order.house}</h2>
            <h4>Submitted: <b><Moment format="MM/DD/YYYY HH:mm" date={order.orderSubmitted} /></b></h4>
            <h4>Submitted by: <b>{order.userFullName}</b></h4>
            <h4>Supplies: <b>{order.orderType}</b></h4>
            {order.comments &&
                <h4><i>"{order.comments}"</i></h4>
            }
            {order.emergency == "Yes" &&
                <div style={emergency} className='text-center'>
                    <h3>Emergency Order</h3>
                    <h4>{order.emergencyJustification}</h4>
                </div>
            }
        </div>;
    }
}