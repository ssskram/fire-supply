import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { ApplicationState } from '../../store'
import * as types from '../../store/types'
import * as userProfile from '../../store/userProfile'
import Cart from './cartButton'

const allOrders = require('../../images/allOrders.png')
const singleOrder = require('../../images/singleOrder.png')
const tp = require('../../images/tp.png')

type props = {
    userProfile: types.userProfile
}

export class Menu extends React.Component<props, {}> {

    public render() {
        return (
            <div className='nav-container'>
                {this.props.userProfile.department != '...loading' &&
                    <Link to={'/'} >
                        <button className='btn btn-success nav-button'>
                            <div>Shop {this.props.userProfile.department}</div>
                        </button>
                    </Link>
                }
                <Link to={'/MyOrders'}>
                    <button className='btn btn-primary nav-button' title='My orders'>
                        <img src={singleOrder as string} className='img-responsive center-block' />
                    </button>
                </Link>
                <Link to={'/AllOrders'}>
                    <button className='btn btn-primary nav-button' title='All orders'>
                        <img src={allOrders as string} className='img-responsive center-block' />
                    </button>
                </Link>
                <Link to={'/'}>
                    <button className='btn btn-primary nav-button'>
                        <img src={tp as string} className='img-responsive center-block' />
                    </button>
                </Link>
                <hr />
                <Cart />
                {this.props.userProfile.isAdmin &&
                    <Link to={'/Admin'}>
                        <button className='btn btn-danger nav-button'>
                            Administration
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
)(Menu as any)