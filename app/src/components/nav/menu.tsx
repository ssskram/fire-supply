import * as React from 'react'
import { connect } from 'react-redux'
import { ApplicationState } from '../../store'
import * as types from '../../store/types'
import * as userProfile from '../../store/userProfile'
import { Nav, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Cart from './cartButton'

const allOrders = require('../../images/allOrders.png')
const singleOrder = require('../../images/singleOrder.png')

type props = {
    userProfile: types.userProfile
}

export class Menu extends React.Component<props, {}> {

    public render() {
        return (
            <Nav>
                {this.props.userProfile.isAdmin &&
                    <LinkContainer to={'/Admin'}>
                        <NavItem>
                            <button className='btn btn-danger nav-button'>
                                Administration
                    </button>
                        </NavItem>
                    </LinkContainer>
                }
                <LinkContainer to={'/MyOrders'}>
                    <NavItem>
                        <button className='btn btn-primary nav-button'>
                            <img src={singleOrder as string} className='img-responsive center-block' />
                            <div>My orders</div>
                        </button>
                    </NavItem>
                </LinkContainer>
                <LinkContainer to={'/AllOrders'}>
                    <NavItem>
                        <button className='btn btn-primary nav-button'>
                            <img src={allOrders as string} className='img-responsive center-block' />
                            <div>All orders</div>
                        </button>
                    </NavItem>
                </LinkContainer>
                <hr />
                <NavItem>
                    <Cart />
                </NavItem>
            </Nav>
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
)(Menu as any)