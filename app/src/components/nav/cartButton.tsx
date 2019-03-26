import * as React from 'react'
import { NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
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
                    <LinkContainer to={'/'}>
                        <NavItem>
                            <button className='btn btn-success nav-button cart'>
                                <div style={Style.orderFont}>
                                    <img src={fullCart as string} className='img-responsive center-block' />
                                    <div>Your cart is empty</div>
                                </div>
                            </button>
                        </NavItem>
                    </LinkContainer>
                }
                {userProfile.cart.length > 0 &&
                    <LinkContainer to={'/Cart'}>
                        <NavItem>
                            <button className='btn btn-success nav-button cart'>
                                <div style={Style.orderFont}>
                                    <img src={fullCart as string} className='img-responsive center-block' />
                                    <div>Shopping cart ({this.props.userProfile.cart.length})</div>
                                </div>
                            </button>
                        </NavItem>
                    </LinkContainer>
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