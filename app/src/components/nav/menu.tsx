import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { ApplicationState } from '../../store'
import * as types from '../../store/types'
import * as userProfile from '../../store/userProfile'
import { Nav } from 'react-bootstrap'
import Cart from './cartButton'

const allOrders = require('../../images/allOrders.png')
const singleOrder = require('../../images/singleOrder.png')

type props = {
    userProfile: types.userProfile
}

export class Menu extends React.Component<props, {}> {

    public render() {
        return (
            <div className='nav-container'>
                {this.props.userProfile.isAdmin &&
                    <Link to={'/Admin'}>
                        <button className='btn btn-danger nav-button'>
                            Administration
                            </button>
                    </Link>
                }
                <Link to={'/MyOrders'}>
                    <button className='btn btn-primary nav-button'>
                        <img src={singleOrder as string} className='img-responsive center-block' />
                        <div>My orders</div>
                    </button>
                </Link>
                <Link to={'/AllOrders'}>
                    <button className='btn btn-primary nav-button'>
                        <img src={allOrders as string} className='img-responsive center-block' />
                        <div>All orders</div>
                    </button>
                </Link>
                <hr />
                <Cart />
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
)(Menu as any)