import * as React from 'react'
import { connect } from 'react-redux'
import { ApplicationState } from '../../store'
import * as types from '../../store/types'
import * as userProfile from '../../store/userProfile'
import * as Style from './style'
import Modal from 'react-responsive-modal'
import SetQuantity from '../itemQuantity'

type props = {
    userProfile: types.userProfile
    item: types.item
    updateCart: (newCart: Array<types.cartItem>) => void
}

type state = {
    setQuantity: boolean
}

export class AddToCart extends React.Component<any, state> {
    constructor(props) {
        super(props)
        this.state = {
            setQuantity: false,
        }
    }

    newCart(cartItem) {
        let newCart = this.props.userProfile.cart
        newCart.push(cartItem)
        this.props.updateCart(newCart)
        this.setState({
            setQuantity: false
        })
    }

    render() {
        const {
            setQuantity
        } = this.state

        const {
            item
        } = this.props

        return (
            <div>
                <button onClick={() => this.setState({ setQuantity: true })} className='btn btn-success' title='Add to cart'>
                    <span style={Style.addToCart} className='glyphicon glyphicon-plus'></span>
                    Cart
                </button>
                {setQuantity &&
                    <Modal
                        open={true}
                        onClose={() => { this.setState({ setQuantity: false }) }}
                        classNames={Style.modalClasses}
                        showCloseIcon={true}
                        center>
                        <SetQuantity
                            quantity={0}
                            item={item}
                            type={'Add to cart'}
                            returnQuantity={this.newCart.bind(this)}
                        />
                    </Modal>
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
)(AddToCart)