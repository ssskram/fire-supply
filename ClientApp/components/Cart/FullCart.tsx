import * as React from 'react'
import { connect } from 'react-redux'
import { ApplicationState } from '../../store'
import Modal from 'react-responsive-modal'
import * as Cart from '../../store/cart'
import { Link } from 'react-router-dom'
import { Helmet } from "react-helmet"
import SelectQuantity from './EnterQuantity'
import DeleteItem from './DeleteItems'
import Table from "react-table"
import Submit from './Submit'

const paddingLeft = {
    paddingLeft: '25px'
}

const paddingRight = {
    paddingRight: '25px'
}

const cartIcon = {
    paddingLeft: '15px',
    fontSize: '5em',
}

const submitButton = {
    fontSize: '22px',
    marginTop: '15px'
}

const btnStyle = {
    width: '250px'
}

const columns = [{
    Header: 'Item',
    accessor: 'obj'
}, {
    Header: 'Type',
    accessor: 'family'
}, {
    Header: 'Unit',
    accessor: 'unit'
}, {
    Header: 'Quantity',
    accessor: 'quantity'
}]

export class FullCart extends React.Component<any, any> {
    constructor() {
        super();
        this.state = {
            modalIsOpen: false,
            selectedItem: {},
            updateType: '',
            emergencyOrder: false,
            house: ''
        }
    }

    componentDidMount() {
        this.props.loadCart()
    }

    closeModal() {
        this.setState({
            modalIsOpen: false,
            selectedItem: {},
            updateType: ''
        });
    }

    deleteItem(item) {
        this.setState({
            modalIsOpen: true,
            selectedItem: item,
            updateType: 'delete'
        })
    }

    updateQuantity(item) {
        this.setState({
            modalIsOpen: true,
            selectedItem: item,
            updateType: 'quantity'
        })
    }

    confirmCart() {
        console.log(this.props.cart)
        this.setState({
            modalIsOpen: true,
            updateType: 'confirm'
        })
    }

    submitIt () {
        this.setState ({
            updateType: 'submit'
        })
    }
    public render() {
        const {
            cart
        } = this.props

        const {
            modalIsOpen,
            selectedItem,
            updateType
        } = this.state

        const houseSupplies = cart.filter(item => item.family == 'House')
        const renderHouse = houseSupplies.map((item) => {
            return (
                <div className="col-lg-4 col-md-6 col-sm-12" key={item.id}>
                    <div className="panel">
                        <div className="panel-body text-center">
                            <h3>{item.obj}</h3>
                            <h3><b>{item.quantity}</b></h3>
                            <h5>Unit: <b>{item.unit}</b></h5>
                            <button onClick={() => this.deleteItem(item)} className='btn btn-danger'><span className='glyphicon glyphicon-trash'></span></button>
                            <button onClick={() => this.updateQuantity(item)} className='btn btn-success'><span className='glyphicon glyphicon-plus'></span></button>
                        </div>
                    </div>
                </div>
            )
        })

        const officeSupplies = cart.filter(item => item.family == 'Office')
        const renderOffice = officeSupplies.map((item) => {
            return (
                <div className="col-lg-4 col-md-6 col-sm-12" key={item.id}>
                    <div className="panel">
                        <div className="panel-body text-center">
                            <h3>{item.obj}</h3>
                            <h3><b>{item.quantity}</b></h3>
                            <h5>Unit: <b>{item.unit}</b></h5>
                            <button onClick={() => this.deleteItem(item)} className='btn btn-danger'><span className='glyphicon glyphicon-trash'></span></button>
                            <button onClick={() => this.updateQuantity(item)} className='btn btn-success'><span className='glyphicon glyphicon-plus'></span></button>
                        </div>
                    </div>
                </div>
            )
        })

        const medicalSupplies = cart.filter(item => item.family == 'Medical')
        const renderMedical = medicalSupplies.map((item) => {
            return (
                <div className="col-lg-4 col-md-6 col-sm-12" key={item.id}>
                    <div className="panel">
                        <div className="panel-body text-center">
                            <h3>{item.obj}</h3>
                            <h3><b>{item.quantity}</b></h3>
                            <h5>Unit: <b>{item.unit}</b></h5>
                            <button onClick={() => this.deleteItem(item)} className='btn btn-danger'><span className='glyphicon glyphicon-trash'></span></button>
                            <button onClick={() => this.updateQuantity(item)} className='btn btn-success'><span className='glyphicon glyphicon-plus'></span></button>
                        </div>
                    </div>
                </div>
            )
        })

        const medicine = cart.filter(item => item.family == 'Medicine')
        const renderMedicine = medicine.map((item) => {
            return (
                <div className="col-lg-4 col-md-6 col-sm-12" key={item.id}>
                    <div className="panel">
                        <div className="panel-body text-center">
                            <h3>{item.obj}</h3>
                            <h3><b>{item.quantity}</b></h3>
                            <h5>Unit: <b>{item.unit}</b></h5>
                            <button onClick={() => this.deleteItem(item)} className='btn btn-danger'><span className='glyphicon glyphicon-trash'></span></button>
                            <button onClick={() => this.updateQuantity(item)} className='btn btn-success'><span className='glyphicon glyphicon-plus'></span></button>
                        </div>
                    </div>
                </div>
            )
        })

        const equipment = cart.filter(item => item.family == 'Equipment')
        const renderEquipment = equipment.map((item) => {
            return (
                <div className="col-lg-4 col-md-6 col-sm-12" key={item.id}>
                    <div className="panel">
                        <div className="panel-body text-center">
                            <h3>{item.obj}</h3>
                            <h3><b>{item.quantity}</b></h3>
                            <h5>Unit: <b>{item.unit}</b></h5>
                            <button onClick={() => this.deleteItem(item)} className='btn btn-danger'><span className='glyphicon glyphicon-trash'></span></button>
                            <button onClick={() => this.updateQuantity(item)} className='btn btn-success'><span className='glyphicon glyphicon-plus'></span></button>
                        </div>
                    </div>
                </div>
            )
        })

        return <div>
            <Helmet>
                <style>{'body { background-color: rgba(92, 184, 92, .05); }'}</style>
            </Helmet>
            <div className='col-md-12'>
                <div>
                    {cart.length == 0 &&
                        <div className='text-center'>
                            <br />
                            <br />
                            <br />
                            <h1>Your cart is empty!</h1>
                            <br />
                            <div><span style={cartIcon} className='glyphicon glyphicon-shopping-cart'></span></div>
                            <br />
                            <h1><Link to={'/Items'}>Head here to get started</Link></h1>
                        </div>
                    }
                    {cart.length > 0 &&
                        <div>
                            <div className='row'>
                                <span style={cartIcon} className='glyphicon glyphicon-shopping-cart pull-left'></span>
                                <button style={submitButton} onClick={this.confirmCart.bind(this)} className='btn btn-success pull-right'><b>Submit order</b></button>
                            </div>
                            <br />
                            {houseSupplies.length > 0 &&
                                <div className='row'>
                                    <div className='d-flex justify-content-between'>
                                        <h2 style={paddingLeft}><span style={paddingRight} className='glyphicon glyphicon-home'></span>House supplies</h2>
                                    </div>
                                    <hr />
                                    <div className='col-md-12'>
                                        {renderHouse}
                                    </div>
                                </div>
                            }
                            {officeSupplies.length > 0 &&
                                <div className='row'>
                                    <h2 style={paddingLeft}><span style={paddingRight} className='glyphicon glyphicon-folder-open'></span>Office supplies</h2>
                                    <hr />
                                    <div className='col-md-12'>
                                        {renderOffice}
                                    </div>
                                </div>
                            }
                            {medicalSupplies.length > 0 &&
                                <div className='row'>
                                    <h2 style={paddingLeft}><span style={paddingRight} className='glyphicon glyphicon-plus-sign'></span>Medical supplies</h2>
                                    <hr />
                                    <div className='col-md-12'>
                                        {renderMedical}
                                    </div>
                                </div>
                            }
                            {medicine.length > 0 &&
                                <div className='row'>
                                    <h2 style={paddingLeft}><span style={paddingRight} className='glyphicon glyphicon-grain'></span>Medicine</h2>
                                    <hr />
                                    <div className='col-md-12'>
                                        {renderMedicine}
                                    </div>
                                </div>
                            }
                            {equipment.length > 0 &&
                                <div className='row'>
                                    <h2 style={paddingLeft}><span style={paddingRight} className='glyphicon glyphicon-wrench'></span>Equipment</h2>
                                    <hr />
                                    <div className='col-md-12'>
                                        {renderEquipment}
                                    </div>
                                </div>
                            }
                        </div>
                    }
                </div>
                <br />
                <br />
                <br />
            </div>
            <Modal
                open={modalIsOpen}
                onClose={this.closeModal.bind(this)}
                classNames={{
                    overlay: 'custom-overlay',
                    modal: 'custom-modal'
                }}
                center>
                {updateType == 'quantity' &&
                    <SelectQuantity closeModal={this.closeModal.bind(this)} item={selectedItem} put={true} />
                }
                {updateType == 'delete' &&
                    <DeleteItem closeModal={this.closeModal.bind(this)} item={selectedItem} />
                }
                {updateType == 'confirm' &&
                    <div className='col-md-12 text-center'>
                        <br />
                        <h2>Is this everything?</h2>
                        <Table
                            data={cart}
                            columns={columns}
                            loading={false}
                            minRows={0}
                            showPagination={false}
                            noDataText=''
                            defaultSorted={[
                                {
                                    id: 'family',
                                    asc: true
                                }
                            ]} />
                            <br/>
                            <button style={btnStyle} onClick={this.submitIt.bind(this)} className='btn btn-success'>Yes</button>
                    </div>
                }
                {updateType == 'submit' &&
                    <Submit />
                }
            </Modal>
        </div>;
    }
}

export default connect(
    (state: ApplicationState) => ({
        ...state.cart,
    }),
    ({
        ...Cart.actionCreators,
    })
)(FullCart as any) as typeof FullCart;