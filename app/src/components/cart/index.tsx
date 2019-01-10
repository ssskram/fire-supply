import * as React from 'react'
import { connect } from 'react-redux'
import { ApplicationState } from '../../store'
import * as types from '../../store/types'
import { Ghost } from 'react-kawaii'
import * as userProfile from '../../store/userProfile'
import * as user from '../../store/user'
import ReactTable from "react-table"
import Form from './fields'
import Messages from '../utilities/messages'

type props = {
    user: types.user
    userProfile: types.userProfile
    setUserProfile: (object: types.userProfile) => void
    updateCart: (newProfile) => void
}

type state = {
    limitExceeded: boolean
    cart: types.cartItem[]
    showForm: boolean
}

export class Cart extends React.Component<props, state> {
    constructor(props) {
        super(props)
        this.state = {
            limitExceeded: false,
            cart: props.userProfile.cart,
            showForm: false
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            cart: nextProps.userProfile.cart
        })
    }

    deleteItem(item) {
        const itemDeleted = this.state.cart.filter(i => i._id != item._id)
        this.postCart(itemDeleted)
    }

    increaseQuantity(item) {
        const cartCopy = this.state.cart
        const itemIndex = cartCopy.findIndex(i => i._id == item._id)
        if (cartCopy[itemIndex].quantity + 1 > 44) {
            this.setState({ limitExceeded: true })
        } else {
            cartCopy[itemIndex].quantity++
            this.postCart(cartCopy)
        }
    }

    decreaseQuantity(item) {
        const cartCopy = this.state.cart
        const itemIndex = cartCopy.findIndex(i => i._id == item._id)
        if (cartCopy[itemIndex].quantity - 1 < 1) {
            this.deleteItem(item)
        } else {
            cartCopy[itemIndex].quantity--
            this.postCart(cartCopy)
        }
    }

    postCart(newCart) {
        const newUserProfile = {
            user: this.props.user.email,
            cart: newCart
        }
        this.setState({ limitExceeded: false })
        this.props.updateCart(newUserProfile)
    }

    showForm() {
        this.setState({ showForm: true })
    }

    render() {
        const {
            limitExceeded,
            cart,
            showForm
        } = this.state

        const columns = [{
            Header: 'Item',
            accessor: 'item',
            Cell: props => <b>{props.value.itemName}</b>
        }, {
            Header: 'Type',
            accessor: 'item',
            Cell: props => <div>{props.value.itemType}</div>
        }, {
            Header: 'Quantity',
            accessor: 'quantity',
        }, {
            Header: '',
            accessor: 'item',
            Cell: props => <button onClick={() => this.decreaseQuantity(props.original)} className='btn btn-warning' title='Decrease quantity'><span className='glyphicon glyphicon-minus'></span></button>,
            maxWidth: 65
        }, {
            Header: '',
            accessor: 'item',
            Cell: props => <button onClick={() => this.increaseQuantity(props.original)} className='btn btn-success' title='Increase quantity'><span className='glyphicon glyphicon-plus'></span></button>,
            maxWidth: 65
        }, {
            Header: '',
            accessor: 'item',
            Cell: props => <button onClick={() => this.deleteItem(props.original)} className='btn btn-danger' title='Delete item'><span className='glyphicon glyphicon-remove'></span></button>,
            maxWidth: 65
        }]

        return (
            <div className='row'>
                <div className='col-md-12'>
                    <h2>Your cart</h2>
                    <hr />
                </div>
                <Messages />
                {cart.length > 0 &&
                    <div>
                        {limitExceeded &&
                            <div className='col-md-12 text-center'>
                                <div className='alert alert-danger'>
                                    Sorry, you can't have that much.
                                </div>
                            </div>
                        }
                        <ReactTable
                            data={cart}
                            columns={columns}
                            loading={false}
                            minRows={0}
                            showPagination={false}
                            showPageSizeOptions={false}
                            noDataText=''
                            getTdProps={() => ({
                                style: {
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    fontSize: '14px'
                                }
                            })}
                        />
                        < div className='col-md-12 text-center'>
                            <br />
                            <button onClick={this.showForm.bind(this)} className='btn btn-success'>Submit order</button>
                        </div>
                    </div>
                }
                {cart.length == 0 &&
                    <div className='col-md-12 text-center' style={{ margin: '60px 0px' }}>
                        <Ghost size={200} mood="shocked" color="#AED3E5" />
                        <div className='alert alert-info' style={{ maxWidth: '650px', margin: '0 auto' }}>
                            <h3>Your cart is empty</h3>
                        </div>
                    </div>
                }
                {showForm &&
                    <Form closeForm={() => this.setState({ showForm: false })}/>
                }
            </div>
        )
    }
}

export default connect(
    (state: ApplicationState) => ({
        ...state.userProfile,
        ...state.user
    }),
    ({
        ...userProfile.actionCreators,
        ...user.actionCreators
    })
)(Cart as any)