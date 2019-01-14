import * as React from 'react'
import Modal from 'react-responsive-modal'
import * as types from '../../../store/types'
import * as style from '../style'
import * as moment from 'moment'
import ReactTable from "react-table"
import { narcanContainer } from '../../cart/style'
import doesOrderContainNarcan from '../../cart/functions/doesOrderContainNarcan'

type props = {
    order: types.order
    closeView: () => void
}

export default class ViewOrder extends React.Component<props, {}> {
    
    render() {
        const {
            order
        } = this.props

        const columns = [{
            Header: 'Item',
            accessor: 'item',
            Cell: props => <b>{props.value.itemName}</b>
        }, {
            Header: 'Type',
            accessor: 'item',
            Cell: props => <div>{props.value.itemType}</div>
        }, {
            Header: 'Unit',
            accessor: 'item',
            Cell: props => <div>{props.value.itemUnit}</div>
        }, {
            Header: 'Ordered',
            accessor: 'quantityOrdered',
        }, {
            Header: 'Received',
            accessor: 'quantityReceived',
        }]

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
                            <div className='alert alert-danger'>
                                <b>EMERGENCY ORDER</b><br />
                                <i>{order.emergencyJustification}</i>
                            </div>
                        }
                        <hr />
                    </div>
                    <div>
                        <div>
                            <span className='pull-left'>{order._id && <div>Order #{order._id.substr(order._id.length - 6)}</div>}</span>
                            <span className='pull-right'>{moment(order.createdAt).format('MM/DD/YYYY hh:mm A')}</span>
                        </div>
                        <br />
                        <div>Submitted by {order.userName}</div>
                        <a href={'mailto:' + order.user}>{order.user}</a>
                        {order.comments && <div><b>Comments: </b>"{order.comments}"</div>}
                        <div style={{ margin: '10px 0px' }}>
                            <ReactTable
                                data={order.supplies}
                                columns={columns}
                                loading={false}
                                minRows={0}
                                showPagination={false}
                                showPageSizeOptions={false}
                                noDataText=''
                                getTdProps={() => ({
                                    style: {
                                        padding: '5px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        fontSize: '12px'
                                    }
                                })}
                            />
                        </div>
                        {order.miscItems &&
                            <div className='text-center' style={style.otherItems}>
                                <b>Other items:</b><br />
                                {order.miscItems}
                            </div>
                        }
                        {doesOrderContainNarcan(order.supplies) &&
                            <div style={narcanContainer} className='text-center'>
                                <b>NARCAN</b>
                                <div>In posession of cases: <b>{order.narcanCases}</b></div>
                                {order.narcanAdministeredUnknown &&
                                    <div>
                                        <div>Explanation for unknown amount administered:</div>
                                        <div><b>"{order.narcanAdministeredUnknown}"</b></div>
                                    </div>
                                }
                            </div>
                        }
                        <hr />
                        <div className='alert alert-info text-center'>
                            <div>Order status: <b>{order.status}</b></div>
                        </div>
                        {order.receivedBy &&
                            <div className='alert alert-info'>
                                <div>Received by: <b>{order.receivedBy}</b></div>
                            </div>
                        }
                        {order.supplyComments &&
                            <div className='alert alert-info'>
                                <div>Supply comments:<br /><b>{order.supplyComments}</b></div>
                            </div>
                        }
                    </div>
                </div>
            </Modal>
        )
    }
}