import * as React from 'react'
import { connect } from 'react-redux'
import { ApplicationState } from '../../store'
import * as Cart from '../../store/cart'
import { Link } from 'react-router-dom'
import * as ItemsStore from '../../store/items'
import classnames from 'classnames'

const padding = {
    paddingRight: '15px',
    paddingLeft: '15px'
}

export class MiniCart extends React.Component<any, any> {
    constructor() {
        super();
    }

    componentDidMount() {
        this.props.loadCart()
        console.log(this.props.cart)
    }

    componentWillReceiveProps (nextProps) {
        console.log(nextProps)
    }

    public render() {
        const {
            cart,
        } = this.props

        var classNames = classnames({
            'cart-container': true,
            'red-border': cart.length > 0
        });

        return <div className={classNames}>
            {cart.length == 0 &&
                <div><span style={padding} className='glyphicon glyphicon-shopping-cart'></span>Your cart is empty</div>
            }
            {cart.length > 0 &&
                <div className='text-center'>
                    <div><h4 className='text-danger'><b>You have items in your cart</b></h4></div>
                    <Link to={'/Cart'} onClick={this.props.closeModal} className='btn btn-success mini-cart-button'>View cart</Link>
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