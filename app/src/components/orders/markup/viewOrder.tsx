import * as React from 'react'
import Modal from 'react-responsive-modal'
import * as types from '../../../store/types'
import * as style from '../style'
import * as moment from 'moment'

type props = {
    order: types.order
    closeView: () => void
}

export default class ViewOrder extends React.Component<props, {}> {

    componentDidMount() {
        console.log(this.props.order)
    }

    render() {
        const {
            order
        } = this.props

        return (
            <Modal
                open={true}
                onClose={() => this.props.closeView()}
                classNames={{
                    overlay: 'custom-overlay',
                    modal: 'custom-modal'
                }}
                showCloseIcon={true}
                center>
                <div>
                    <div className='text-center'>
                        <h4 style={style.viewOrderHeader}>
                            {order.department}
                        </h4>
                        <h4>
                            <b>House {order.location}</b>
                        </h4>
                        {order.emergencyOrder &&
                            <div style={style.Emergency}>
                                <b>EMERGENCY ORDER</b><br />
                                <i>{order.emergencyJustification}</i>
                            </div>
                        }
                        <hr />
                    </div>
                    <div>
                        <div>Submitted by {order.userName}</div>
                        <a href={'mailto:' + order.user}>{order.user}</a>
                        <div>{moment(order.createdAt).format('MM/DD/YYYY hh:mm A')}</div>
                    </div>
                </div>
            </Modal>
        )
    }
}