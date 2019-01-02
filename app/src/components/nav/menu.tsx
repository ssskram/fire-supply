import * as React from 'react'
import { Nav, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import * as Style from './style'

const fullCart = require('../../images/fullCart.png')
const allOrders = require('../../images/allOrders.png')
const singleOrder = require('../../images/singleOrder.png')

export default class Menu extends React.Component {

    public render() {
        return (
            <Nav>
                <LinkContainer to={'/Admin'}>
                    <NavItem>
                        <button style={Style.navButton} className='btn btn-danger'>
                            Administration
                        </button>
                    </NavItem>
                </LinkContainer>
                <LinkContainer to={'/MyOrders'}>
                    <NavItem>
                        <button style={Style.navButton} className='btn btn-primary'>
                            <img src={singleOrder as string} className='img-responsive center-block' />
                            <div>My orders</div>
                        </button>
                    </NavItem>
                </LinkContainer>
                <LinkContainer to={'/AllOrders'}>
                    <NavItem>
                        <button style={Style.navButton} className='btn btn-primary'>
                            <img src={allOrders as string} className='img-responsive center-block' />
                            <div>All orders</div>
                        </button>
                    </NavItem>
                </LinkContainer>
                <hr />
                <LinkContainer to={'/Cart'} exact>
                    <NavItem>
                        <button style={Style.navButton} className='btn btn-success'>
                            <div style={Style.orderFont}>
                                <img src={fullCart as string} className='img-responsive center-block' />
                                <div>Shopping cart</div>
                            </div>
                        </button>
                    </NavItem>
                </LinkContainer>
            </Nav>
        )
    }
}
