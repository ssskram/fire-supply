import * as React from 'react'
import { connect } from 'react-redux'
import { ApplicationState } from '../../store'
import * as Cart from '../../store/cart'
import Input from '../FormElements/input'

const padding = {
    padding: '25px'
}

export class MiscItem extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            cartID: this.props.cartID,
            obj: '',
            family: 'Miscellaneous',
            unit: 'Each',
            quantityOrdered: ''
        }
    }

    handleChildChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    addItem() {
        this.props.addItem(this.state)
        this.props.closeModal()
    }

    public render() {
        const {
            obj,
            quantityOrdered
        } = this.state

        const isEnabled =
            obj != ''

        return <div style={padding}>
            <div className="col-md-12 form">
                <div className="text-center">
                    <div className='row' >
                        <Input
                            value={obj}
                            name="obj"
                            header="Miscellaneous item"
                            placeholder="Describe item"
                            callback={this.handleChildChange.bind(this)}
                        />

                        <Input
                            value={quantityOrdered}
                            name="quantityOrdered"
                            header="Enter quantity"
                            placeholder="Numbers only"
                            callback={this.handleChildChange.bind(this)}
                        />
                    </div>
                    <div className='row'>
                        <button disabled={!isEnabled} onClick={this.addItem.bind(this)} className='btn btn-success'>Add to cart</button>
                    </div>
                </div>
            </div>
        </div>;
    }
}

export default connect(
    (state: ApplicationState) => ({
        ...state.cart
    }),
    ({
        ...Cart.actionCreators
    })
)(MiscItem as any) as typeof MiscItem;