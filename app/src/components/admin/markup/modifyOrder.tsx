import * as React from 'react'
import Modal from 'react-responsive-modal'
import * as types from '../../../store/types'
import * as style from '../../orders/style'
import * as moment from 'moment'
import ReactTable from "react-table"
import { narcanContainer } from '../../cart/style'
import doesOrderContainNarcan from '../../cart/functions/doesOrderContainNarcan'
import Fields from './fields'
import Number from 'react-currency-input'

type props = {
    order: types.order
    closeView: () => void
    updateOrder: (newOrder) => boolean
    errorMessage: () => void
    setState: (obj) => void
}

type state = types.order

export default class ModifyOrder extends React.Component<props, state> {
    constructor(props) {
        super(props)
        this.state = {
            _id: props.order._id,
            user: props.order.user,
            userName: props.order.userName,
            department: props.order.department,
            location: props.order.location,
            comments: props.order.comments,
            emergencyOrder: props.order.emergencyOrder,
            emergencyJustification: props.order.emergencyJustification,
            narcanCases: props.order.narcanCases,
            narcanAdministeredUnknown: props.order.narcanAdministeredUnknown,
            miscItems: props.order.miscItems,
            supplies: props.order.supplies,
            status: props.order.status,
            supplyComments: props.order.supplyComments,
            receivedBy: props.order.receivedBy,
            createdAt: props.order.createdAt,
            _v: props.order._v
        }
    }

    updateSupplies(qtyReceived, itemID) {
        const suppliesCopy = this.state.supplies
        const itemIndex = suppliesCopy.findIndex(sp => sp._id == itemID)
        suppliesCopy[itemIndex].quantityReceived = qtyReceived
        this.setState({ supplies: suppliesCopy })
    }

    async saveOrder() {
        this.props.setState({ spinner: true })
        const success = await this.props.updateOrder(this.state)
        if (success == true) this.props.closeView()
        else {
            this.props.errorMessage()
            this.props.closeView()
        }
    }

    render() {
        const {
            _id,
            createdAt,
            userName,
            user,
            comments,
            department,
            location,
            emergencyOrder,
            emergencyJustification,
            miscItems,
            narcanCases,
            narcanAdministeredUnknown,
            supplies
        } = this.state

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
            Cell: props => <div>
                <Number
                    selectAllOnFocus={false}
                    autoFocus={false}
                    className='form-control'
                    style={{ fontWeight: '600', color: '#a94442' }}
                    precision="0"
                    value={props.original.quantityReceived}
                    onChangeEvent={(e, m, f) => this.updateSupplies(f, props.original._id)}
                />
            </div>
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
                            {department}
                        </h4>
                        <h4>
                            <b>House {location}</b>
                        </h4>
                        {emergencyOrder &&
                            <div style={{ marginBottom: '5px' }} className='alert alert-danger'>
                                <b>EMERGENCY ORDER</b><br />
                                <i>{emergencyJustification}</i>
                            </div>
                        }
                        <hr />
                    </div>
                    <div>
                        <div>
                            <span className='pull-left'>{_id && <div>Order #{_id.substr(_id.length - 6)}</div>}</span>
                            <span className='pull-right'>{moment(createdAt).format('MM/DD/YYYY hh:mm A')}</span>
                        </div>
                        <br />
                        <div>Submitted by {userName}</div>
                        <a href={'mailto:' + user}>{user}</a>
                        {comments && <div><b>Comments: </b>"{comments}"</div>}
                        <div style={{ margin: '10px 0px' }}>
                            <ReactTable
                                data={supplies}
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
                        {miscItems &&
                            <div className='text-center' style={style.otherItems}>
                                <b>Other items:</b><br />
                                {miscItems}
                            </div>
                        }
                        {doesOrderContainNarcan(supplies) &&
                            <div style={narcanContainer} className='text-center'>
                                <b>NARCAN</b>
                                <div>In posession of cases: <b>{narcanCases}</b></div>
                                {narcanAdministeredUnknown &&
                                    <div>
                                        <div>Explanation for unknown amount administered:</div>
                                        <div><b>"{narcanAdministeredUnknown}"</b></div>
                                    </div>
                                }
                            </div>
                        }
                    </div>
                    <hr />
                    <Fields state={this.state} setState={this.setState.bind(this)} />
                    <div className='col-md-12 text-center'>
                        <button onClick={this.saveOrder.bind(this)} className='btn btn-success'>Save</button>
                    </div>
                </div>
            </Modal>
        )
    }
}