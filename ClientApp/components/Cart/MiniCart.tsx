import * as React from 'react'
import { connect } from 'react-redux'
import { ApplicationState } from '../../store'
import * as Cart from '../../store/cart'
import { Link } from 'react-router-dom'
import * as ItemsStore from '../../store/items'

const padding = {
    paddingRight: '15px',
    paddingLeft: '15px'
}

const cartIcon = {
    fontSize: '2em',
}

const cartCount = {
    marginLeft: '10px'
}

export class MiniCart extends React.Component<any, any> {
    constructor() {
        super();
    }

    componentDidMount() {
        this.props.loadCart()
    }

    public render() {
        const {
            cart,
        } = this.props

        return <div>
            {cart.length == 0 &&
                <div className='cart-container'><span style={padding} className='glyphicon glyphicon-shopping-cart'></span>Your cart is empty</div>
            }
            {cart.length > 0 &&
                <div className='text-center'>
                    <Link to={'/Cart'} onClick={this.props.closeModal} className='btn btn-success mini-cart-button'>
                        <div style={cartIcon}>
                            <span className='glyphicon glyphicon-shopping-cart'></span>
                            <span style={cartCount}>{cart.length}</span>
                        </div>
                        <div>
                            View cart
                        </div>
                    </Link>
                </div>
            }
        </div>;
    }
}

export default connect(
    (state: ApplicationState) => ({
        ...state.cart,
        ...state.items
    }),
    ({
        ...Cart.actionCreators,
        ...ItemsStore.actionCreators
    })
)(MiniCart as any) as typeof MiniCart;