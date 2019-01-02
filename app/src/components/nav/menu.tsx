import * as React from 'react'
import { Nav, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import * as Style from './style'
import Cart from '../cart'

const allOrders = require('../../images/allOrders.png')
const singleOrder = require('../../images/singleOrder.png')

export default class Menu extends React.Component {

    public render() {
        return (
            <Nav>
                <LinkContainer to={'/Admin'}>
                    <NavItem>
                        <button className='btn btn-danger nav-button'>
                            Administration
                        </button>
                    </NavItem>
                </LinkContainer>
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
