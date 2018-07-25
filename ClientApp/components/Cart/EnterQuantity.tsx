import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import Input from '../FormElements/input'
import * as Cart from '../../store/cart'

const padding = {
    padding: '25px'
}

const width = {
    width: '200px',
    margin: '0 auto'
}

export class SelectQuantity extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            obj: props.item.obj,
            id: props.item.id,
            family: props.item.family,
            unit: props.item.unit,
            quantity: ''
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

    updateItem() {
        this.props.updateItem(this.state)
        this.props.closeModal()
    }

    public render() {
        const {
            quantity
        } = this.state

        const {
            put,
            item
        } = this.props

        const isEnabled =
            quantity != '' &&
            quantity.match(/^[0-9]+$/)

        return <div style={padding}>
            <div className="col-md-12 form" key={item.id}>
                <div className="text-center">
                    <h3>{item.obj}</h3>
                    <h4>Item type: <b>{item.family}</b></h4>
                    <h4>Unit of issue: <b>{item.unit}</b></h4>
                    <div className='row' >
                        <div style={width}>
                            <Input
                                value={quantity}
                                name="quantity"
                                header="Enter quantity"
                                placeholder="Numbers only"
                                callback={this.handleChildChange.bind(this)}
                            />
                        </div>
                    </div>
                    {!put &&
                        <div className='row'>
                            <button disabled={!isEnabled} onClick={this.addItem.bind(this)} className='btn btn-success'>Add to cart</button>
                        </div>
                    }
                    {put == true &&
                        <div className='row'>
                            <button disabled={!isEnabled} onClick={this.updateItem.bind(this)} className='btn btn-success'>Update quantity</button>
                        </div>
                    }
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
)(SelectQuantity as any) as typeof SelectQuantity;