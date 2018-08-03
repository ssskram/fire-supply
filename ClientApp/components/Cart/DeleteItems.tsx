import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import * as Cart from '../../store/cart'

const objColor = {
    color: '#d9534f'
}

const padding = {
    padding: '25px'
}

export class DeleteItems extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            cartID : this.props.cartID,
            obj: this.props.item.obj,
            family: this.props.item.family,
            unit: this.props.item.family.unit,
            quantityOrdered: this.props.item.quantityOrdered
        }
    }

    componentDidMount() {
        console.log(this.props)
    }

    updateCart () {
        this.props.deleteItem(this.state)
        this.props.closeModal()
    }

    public render() {
        const {
            item
        } = this.props

        return <div style={padding}>
            <div className="col-md-12 form" key={item.id}>
                <div className="text-center">
                    <h3><b>Are you sure you want to delete this item?</b></h3>
                    <h3 style={objColor}>{item.obj}</h3>
                    <h4>Item type: <b>{item.family}</b></h4>
                    <h4>Unit of issue: <b>{item.unit}</b></h4>
                    <h4>Quantity: <b>{item.quantityOrdered}</b></h4>
                    <div className='row'>
                        <button onClick={this.updateCart.bind(this)} className='btn btn-danger'>Delete</button>
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
)(DeleteItems as any) as typeof DeleteItems;