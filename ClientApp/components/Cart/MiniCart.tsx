import * as React from 'react'
import { connect } from 'react-redux'
import { ApplicationState } from '../../store'
import * as Cart from '../../store/cart'
import * as ItemsStore from '../../store/items'

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
        return <div className='cart-container'>
            <div><span className='glyphicon glyphicon-shopping-cart'> Your cart is empty</span></div>
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