import * as React from 'react'
import { connect } from 'react-redux'
import { ApplicationState } from '../../store'
import * as types from '../../store/types'
import * as userProfile from '../../store/userProfile'
import * as style from './style'
import Number from '../formElements/numbers'

type props = {
    quantity: number
    item: types.item
    type: string
    returnQuantity: (cartItem) => void
}

type state = {
    limitExceeded: boolean
    newQuantity: number
}

export class UpdateQuantity extends React.Component<props, state> {
    constructor(props) {
        super(props)
        this.state = {
            limitExceeded: false,
            newQuantity: props.quantity
        }
    }

    handleLimit(value) {
        if (value > 50) {
            this.setState({
                limitExceeded: true
            })
        } else {
            this.setState({
                limitExceeded: false,
                newQuantity: value
            })
        }
    }

    returnQuantity() {
        const cartItem = {
            item: this.props.item,
            quantity: this.state.newQuantity
        }
        this.props.returnQuantity(cartItem)
    }

    render() {
        const {
            item,
            type,
        } = this.props

        const {
            limitExceeded,
            newQuantity
        } = this.state

        return (
            <div className='col-md-12 text-center'>
                <h3>{item.itemName}</h3>
                <h5>{item.itemType}</h5>
                {limitExceeded &&
                    <div className='alert alert-danger'>
                        Sorry, you can't have that much.
                    </div>
                }
                <div className='row' style={style.inputWidth}>
                    <Number
                        value={newQuantity}
                        header=""
                        prefix=""
                        callback={(e, m, f) => this.handleLimit(f)}
                    />
                </div>
                <button className='btn btn-success' onClick={this.returnQuantity.bind(this)}>{type}</button>
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
)(UpdateQuantity)