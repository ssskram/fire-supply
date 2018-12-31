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
                <LinkContainer to={'/NewOrder'} exact>
                    <NavItem>
                        <button style={Style.navButton} className='btn btn-success'>
                            <img src={fullCart as string} className="img-responsive center-block" />
                            <div style={Style.orderFont}>Order supplies</div>
                        </button>
                    </NavItem>
                </LinkContainer>
                <LinkContainer to={'/MyOrders'}>
                    <NavItem>
                        <button style={Style.navButton} className='btn btn-primary'>
                            <span><img src={singleOrder as string} style={Style.smallImg} />My orders</span>
                        </button>
                    </NavItem>
                </LinkContainer>
                <LinkContainer to={'/AllOrders'}>
                    <NavItem>
                        <button style={Style.navButton} className='btn btn-primary'>
                            <span><img src={allOrders as string} style={Style.smallImg} />All orders</span>
                        </button>
                    </NavItem>
                </LinkContainer>
                <LinkContainer to={'/Admin'}>
                    <NavItem><button style={Style.navButton} className='btn btn-danger'>Administration</button></NavItem>
                </LinkContainer>
            </Nav>
        )
    }
}
