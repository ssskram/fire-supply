import * as React from 'react'
import { connect } from 'react-redux'
import { ApplicationState } from '../../store'
import * as Cart from '../../store/cart'
import { Link } from 'react-router-dom'
import { Helmet } from "react-helmet"

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
    }

    componentDidMount() {
        this.props.loadCart()
    }

    public render() {
        const {
            cart
        } = this.props

        const houseSupplies = cart.filter(item => item.family == 'House')
        const renderHouse = houseSupplies.map((item) => {
            return (
                <div style={fixedHeight} className="col-lg-4 col-md-6 col-sm-12" key={item.id}>
                    <div className="panel">
                        <div className="panel-body text-center">
                            <h4>{item.obj}</h4>
                            <h5>Unit: <b>{item.unit}</b></h5>
                            <h4 style={quantityColor}>Quantity: <b>{item.quantity}</b></h4>
                            <button className='btn btn-danger'>Delete</button>
                            <button className='btn btn-success'>Update quantity</button>
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
                            <button className='btn btn-danger'>Delete</button>
                            <button className='btn btn-success'>Update quantity</button>
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
                            <button className='btn btn-danger'>Delete</button>
                            <button className='btn btn-success'>Update quantity</button>
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
                            <button className='btn btn-danger'>Delete</button>
                            <button className='btn btn-success'>Update quantity</button>
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
                            <button className='btn btn-danger'>Delete</button>
                            <button className='btn btn-success'>Update quantity</button>
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
                <div><span style={cartIcon} className='glyphicon glyphicon-shopping-cart'></span></div>
                <br />
                <div>
                    {cart.length == 0 &&
                        <div className='text-center'>
                            <br />
                            <h1>Your cart is empty!</h1>
                            <br />
                            <img src='./images/shocked-face.png' className="img-responsive home-image" />
                            <br />
                            <h1><Link to={'/Items'}>Head here to get started</Link></h1>
                        </div>
                    }
                    {cart.length > 0 &&
                        <div>
                            {houseSupplies.length > 0 &&
                                <div className='row'>
                                    <h2 style={paddingLeft}>House supplies</h2>
                                    <hr/>
                                    <div>
                                        {renderHouse}
                                    </div>
                                </div>
                            }
                            {cart.filter(item => item.family == 'Office').length > 0 &&
                                <div className='row'>
                                    <h2 style={paddingLeft}>Office supplies</h2>
                                    <hr/>
                                    <div>
                                        {renderOffice}
                                    </div>
                                </div>
                            }
                            {cart.filter(item => item.family == 'Medical').length > 0 &&
                                <div className='row'>
                                    <h2 style={paddingLeft}>Medical supplies</h2>
                                    <hr/>
                                    <div>
                                        {renderMedical}
                                    </div>
                                </div>
                            }
                            {cart.filter(item => item.family == 'Medicine').length > 0 &&
                                <div className='row'>
                                    <h2 style={paddingLeft}>Medicine</h2>
                                    <hr/>
                                    <div>
                                        {renderMedicine}
                                    </div>
                                </div>
                            }
                            {cart.filter(item => item.family == 'Equipment').length > 0 &&
                                <div className='row'>
                                    <h2 style={paddingLeft}>Equipment</h2>
                                    <hr/>
                                    <div>
                                        {renderEquipment}
                                    </div>
                                </div>
                            }
                        </div>
                    }
                </div>
            </div>
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