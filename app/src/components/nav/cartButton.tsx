import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { ApplicationState } from '../../store'
import * as types from '../../store/types'
import * as userProfile from '../../store/userProfile'
import * as Style from '../cart/style'
const fullCart = require('../../images/fullCart.png')

type props = {
    userProfile: types.userProfile
}

export class CartButton extends React.Component<props, {}> {

    render() {
        const {
            userProfile
        } = this.props

        return (
            <div>
                {userProfile.cart.length == 0 &&
                    <button className='btn btn-success nav-button'>
                        <div style={Style.orderFont}>
                            <img src={fullCart as string} className='img-responsive center-block' />
                            <div>Your cart is empty</div>
                        </div>
                    </button>
                }
                {userProfile.cart.length > 0 &&
                    <Link to={'/Cart'}>
                        <button className='btn btn-success nav-button'>
                            <div style={Style.orderFont}>
                                <img src={fullCart as string} className='img-responsive center-block' />
                                <div>Shopping cart ({this.props.userProfile.cart.length})</div>
                            </div>
                        </button>
                    </Link>
                }
            </div>
        )
    }
}

export default connect(
    (state: ApplicationState) => ({
        ...state.userProfile
    }),
    ({
        ...userProfile.actionCreators
    })
)(CartButton as any)