import * as React from 'react'
import { connect } from 'react-redux'
import { ApplicationState } from '../../store'
import * as Cart from '../../store/cart'
import { Link } from 'react-router-dom'


const padding = {
    paddingRight: '15px',
    paddingLeft: '15px'
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
                <div className="col-md-12" key={item.id}>
                    <div className="panel">
                        <div className="panel-body text-center">
                            <h4>{item.obj}</h4>
                            <h5>Item type: <b>{item.family}</b></h5>
                            <button className='btn btn-success'>Delete</button>
                        </div>
                    </div>
                </div>
            )
        })

        return <div>
            <div className='col-md-12'>
                <h2><span style={padding} className='glyphicon glyphicon-shopping-cart'></span>Shopping Cart</h2>
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
                        <div className='cart-container'>
                            {houseSupplies.length > 0 &&
                                <div>
                                    <h2>House supplies</h2>
                                    <div>
                                        {renderHouse}
                                    </div>
                                </div>
                            }
                            {cart.filter(item => item.family == 'Office').length > 0 &&
                                <div>
                                    <h2>
                                        House supplies
                                </h2>
                                </div>
                            }
                            {cart.filter(item => item.family == 'Medical').length > 0 &&
                                <div>
                                    <h2>
                                        Medical supplies
                                </h2>
                                </div>
                            }
                            {cart.filter(item => item.family == 'Medicine').length > 0 &&
                                <div>
                                    <h2>
                                        Medicine
                                </h2>
                                </div>
                            }
                            {cart.filter(item => item.family == 'Equipment').length > 0 &&
                                <div>
                                    <h2>
                                        Equipment
                                </h2>
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