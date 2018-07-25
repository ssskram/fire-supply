import * as React from 'react'
import { connect } from 'react-redux'
import { ApplicationState } from '../../store'
import Modal from 'react-responsive-modal'
import * as Cart from '../../store/cart'
import { Link } from 'react-router-dom'
import { Helmet } from "react-helmet"
import SelectQuantity from './EnterQuantity'
import DeleteItem from './DeleteItems'

const paddingLeft = {
    paddingLeft: '25px'
}

const cartIcon = {
    paddingRight: '15px',
    paddingLeft: '15px',
    fontSize: '5em'
}

const fixedHeight = {
    height: '200px',
}

const quantityColor = {
    color: '#BF1E2E'
}

export class FullCart extends React.Component<any, any> {
    constructor() {
        super();
        this.state = {
            modalIsOpen: false,
            selectedItem: {},
            updateType: ''
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
                <div style={fixedHeight} className="col-lg-4 col-md-6 col-sm-12" key={item.id}>
                    <div className="panel">
                        <div className="panel-body text-center">
                            <h4>{item.obj}</h4>
                            <h5>Unit: <b>{item.unit}</b></h5>
                            <h4 style={quantityColor}>Quantity: <b>{item.quantity}</b></h4>
                            <button onClick={() => this.deleteItem(item)} className='btn btn-danger'>Delete</button>
                            <button onClick={() => this.updateQuantity(item)} className='btn btn-success'>Update quantity</button>
                        </div>
                    </div>
                </div>
            )
        })

        const officeSupplies = cart.filter(item => item.family == 'Office')
        const renderOffice = officeSupplies.map((item) => {
            return (
                <div style={fixedHeight} className="col-lg-4 col-md-6 col-sm-12" key={item.id}>
                    <div className="panel">
                        <div className="panel-body text-center">
                            <h4>{item.obj}</h4>
                            <h4>{item.obj}</h4>
                            <h5>Unit: <b>{item.unit}</b></h5>
                            <h4 style={quantityColor}>Quantity: <b>{item.quantity}</b></h4>
                            <button onClick={() => this.deleteItem(item)} className='btn btn-danger'>Delete</button>
                            <button onClick={() => this.updateQuantity(item)} className='btn btn-success'>Update quantity</button>
                        </div>
                    </div>
                </div>
            )
        })

        const medicalSupplies = cart.filter(item => item.family == 'Medical')
        const renderMedical = medicalSupplies.map((item) => {
            return (
                <div style={fixedHeight} className="col-lg-4 col-md-6 col-sm-12" key={item.id}>
                    <div className="panel">
                        <div className="panel-body text-center">
                            <h4>{item.obj}</h4>
                            <h5>Unit: <b>{item.unit}</b></h5>
                            <h4 style={quantityColor}>Quantity: <b>{item.quantity}</b></h4>
                            <button onClick={() => this.deleteItem(item)} className='btn btn-danger'>Delete</button>
                            <button onClick={() => this.updateQuantity(item)} className='btn btn-success'>Update quantity</button>
                        </div>
                    </div>
                </div>
            )
        })

        const medicine = cart.filter(item => item.family == 'Medicine')
        const renderMedicine = medicine.map((item) => {
            return (
                <div style={fixedHeight} className="col-lg-4 col-md-6 col-sm-12" key={item.id}>
                    <div className="panel">
                        <div className="panel-body text-center">
                            <h4>{item.obj}</h4>
                            <h5>Unit: <b>{item.unit}</b></h5>
                            <h4 style={quantityColor}>Quantity: <b>{item.quantity}</b></h4>
                            <button onClick={() => this.deleteItem(item)} className='btn btn-danger'>Delete</button>
                            <button onClick={() => this.updateQuantity(item)} className='btn btn-success'>Update quantity</button>
                        </div>
                    </div>
                </div>
            )
        })

        const equipment = cart.filter(item => item.family == 'Equipment')
        const renderEquipment = equipment.map((item) => {
            return (
                <div style={fixedHeight} className="col-lg-4 col-md-6 col-sm-12" key={item.id}>
                    <div className="panel">
                        <div className="panel-body text-center">
                            <h4>{item.obj}</h4>
                            <h5>Unit: <b>{item.unit}</b></h5>
                            <h4 style={quantityColor}>Quantity: <b>{item.quantity}</b></h4>
                            <button onClick={() => this.deleteItem(item)} className='btn btn-danger'>Delete</button>
                            <button onClick={() => this.updateQuantity(item)} className='btn btn-success'>Update quantity</button>
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
                            <div><span style={cartIcon} className='glyphicon glyphicon-shopping-cart'></span></div>
                            <br />
                            {houseSupplies.length > 0 &&
                                <div className='row'>
                                    <h2 style={paddingLeft}>House supplies</h2>
                                    <hr />
                                    <div>
                                        {renderHouse}
                                    </div>
                                </div>
                            }
                            {cart.filter(item => item.family == 'Office').length > 0 &&
                                <div className='row'>
                                    <h2 style={paddingLeft}>Office supplies</h2>
                                    <hr />
                                    <div>
                                        {renderOffice}
                                    </div>
                                </div>
                            }
                            {cart.filter(item => item.family == 'Medical').length > 0 &&
                                <div className='row'>
                                    <h2 style={paddingLeft}>Medical supplies</h2>
                                    <hr />
                                    <div>
                                        {renderMedical}
                                    </div>
                                </div>
                            }
                            {cart.filter(item => item.family == 'Medicine').length > 0 &&
                                <div className='row'>
                                    <h2 style={paddingLeft}>Medicine</h2>
                                    <hr />
                                    <div>
                                        {renderMedicine}
                                    </div>
                                </div>
                            }
                            {cart.filter(item => item.family == 'Equipment').length > 0 &&
                                <div className='row'>
                                    <h2 style={paddingLeft}>Equipment</h2>
                                    <hr />
                                    <div>
                                        {renderEquipment}
                                    </div>
                                </div>
                            }
                        </div>
                    }
                </div>
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