import * as React from 'react'
import * as types from '../../store/types'
import * as Style from './style'
import Modal from 'react-responsive-modal'
import SetQuantity from './itemQuantity'
import ErrorHandler from '../../functions/errorHandler'

type props = {
    user: types.user
    userProfile: types.userProfile
    item: types.item
    updateCart: (obj) => void
}

type state = {
    setQuantity: boolean
}

export default class AddToCart extends React.Component<props, state> {
    constructor(props) {
        super(props)
        this.state = {
            setQuantity: false,
        }
    }

    newCart(cartItem) {
        try {
            let newCart = this.props.userProfile.cart
            newCart.push(cartItem)
            const newUserProfile = {
                user: this.props.user.email,
                cart: newCart
            }
            this.props.updateCart(newUserProfile)
            this.setState({
                setQuantity: false
            })
        } catch (err) { ErrorHandler(err) }
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
                    <span className='glyphicon glyphicon-plus' style={{ marginRight: '-2px' }}></span>
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