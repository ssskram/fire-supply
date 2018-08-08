import * as React from 'react'
import Moment from 'react-moment'

const commentsPadding = {
    padding: '10px'
}

const emergency = {
    border: '1px solid #BF1E2E',
    margin: '30px 15px',
    borderRadius: '10px',
    padding: '10px'
}

export default class FullOrder extends React.Component<any, any> {
    constructor() {
        super();
    }

    public render() {
        const {
            order
        } = this.props

        return <div>
            <h2>{order.house}</h2>
            <h4>Submitted: <b><Moment format="MM/DD/YYYY HH:mm" date={order.orderSubmitted} /></b></h4>
            <h4>Submitted by: <b>{order.userFullName}</b></h4>
            <h4>Supplies: <b>{order.orderType}</b></h4>
            {order.comments &&
                <h4 style={commentsPadding}><i>"{order.comments}"</i></h4>
            }
            {order.emergency == "Yes" &&
                <div style={emergency} className='text-center'>
                    <h3><b>EMERGENCY ORDER</b></h3>
                    <h4><i>"{order.emergencyJustification}"</i></h4>
                </div>
            }
            {order.narcanCases &&
                <div>
                    <h3>Narcan</h3>
                    <hr />
                    <h4><b>Cases:</b> {order.narcanCases}</h4>
                    {order.narcanExplanation &&
                        <div>
                            <h4><b>Amount administered is unknown:</b></h4>
                            <h4><i>"{order.narcanExplanation}"</i></h4>
                        </div>
                    }
                </div>
            }
        </div>;
    }
}