import * as React from 'react'
import Modal from 'react-responsive-modal'
import * as types from '../../../store/types'
import * as style from '../style'
import * as moment from 'moment'
import ReactTable from "react-table"
import { narcanContainer, equipmentContainer } from '../../cart/style'
import doesOrderContainNarcan from '../../cart/functions/doesOrderContainNarcan'
import doesOrderContainEquipment from '../../cart/functions/doesOrderContainEquipment'
import getColorByStatus from '../functions/colorByStatus'

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
                        <h5>
                            <b>{order.location}</b>
                        </h5>
                        <div style={{ borderColor: '#383838', marginBottom: '5px', backgroundColor: getColorByStatus(order.status) }} className='alert'>
                            <div><b>{order.status}</b></div>
                        </div>
                        {order.emergencyOrder &&
                            <div style={{ marginBottom: '5px' }} className='alert alert-danger'>
                                <b>EMERGENCY ORDER</b><br />
                                <i>{order.emergencyJustification}</i>
                            </div>
                        }
                        {order.receivedBy &&
                            <div style={{ borderColor: '#383838', marginBottom: '5px', backgroundColor: getColorByStatus(order.status) }} className='alert'>
                                <div>Received by: <b>{order.receivedBy}</b></div>
                            </div>
                        }
                        {order.supplyComments &&
                            <div style={{ borderColor: '#383838', marginBottom: '5px', backgroundColor: getColorByStatus(order.status) }} className='alert'>
                                <div>Supply comments: <br /><b>{order.supplyComments}</b></div>
                            </div>
                        }
                        <hr />
                    </div>
                    <div>
                        <h4 className='text-center'>ORDER DETAILS</h4>
                        <div>
                            <span className='pull-left'>{order._id && <div>Order #{order._id.substr(order._id.length - 6)}</div>}</span>
                            <span className='pull-right'>{moment(order.createdAt).format('MM/DD/YYYY hh:mm A')}</span>
                        </div>
                        <br />
                        <div>Submitted by {order.userName}</div>
                        <a href={'mailto:' + order.user}>{order.user}</a>
                        {order.comments && <div><b>Comments: </b>"{order.comments}"</div>}
                        <div style={{ margin: '10px 0px' }}>
                            {order.supplies.length > 0 &&
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
                                            padding: '10px',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            fontSize: '12px'
                                        }
                                    })}
                                />
                            }
                        </div>
                        {order.miscItems &&
                            <div className='text-center' style={style.otherItems}>
                                <b>Misc. items:</b><br />
                                {order.miscItems}
                            </div>
                        }
                        {doesOrderContainNarcan(order.supplies) &&
                            <div style={narcanContainer} className='text-center'>
                                <b>NARCAN</b>
                                <div><b>In posession of cases:</b> {order.narcanCases.toString()}</div>
                                {order.narcanAdministeredUnknown &&
                                    <div>
                                        <div><b>Unknown amount administered:</b></div>
                                        <div>"{order.narcanAdministeredUnknown}"</div>
                                    </div>
                                }
                            </div>
                        }
                        {doesOrderContainEquipment(order.supplies).check &&
                            <div style={equipmentContainer} className='text-center'>
                                <b>Equipment Justification</b>
                                <div>
                                    <div>"{order.equipmentJustification}"</div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </Modal>
        )
    }
}