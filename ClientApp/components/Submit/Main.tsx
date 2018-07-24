import * as React from 'react'
import { connect } from 'react-redux'
import { ApplicationState } from '../../store'
import * as Ping from '../../store/ping'
import * as ItemsStore from '../../store/items'
import ItemFilters from '../Filters/InventoryFilter'
import Items from './Items'
import Spinner from '../Utilities/Spinner'
import * as Cart from '../../store/cart'

export class ItemSelection extends React.Component<any, any> {
    constructor() {
        super();
        this.state = {
            items: [],
            viewFormat: 'cards',
            onFilter: false
        }
    }

    componentDidMount() {
        let self = this
        window.scrollTo(0, 0)
    
        if (this.props.items.length != 0) {
            console.log(this.props.items)
            if (this.props.cart.length != 0) {
                this.setState({
                    items: this.props.items.filter(function(i) {
                        const filterCartItems = obj => obj.id === i.id
                        return !self.props.cart.some(filterCartItems)
                    })
                })
            } else {
                this.setState ({
                    items: this.props.items
                })
            }

        }

        // load cart items
        this.props.loadCart()

        // load inventory items
        this.props.getItems()

        // ping server
        this.props.ping()
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.onFilter == false) {
            if (nextProps.cart.length != 0) {
                this.setState({
                    items: nextProps.items.filter(function(i) {
                        const filterCartItems = obj => obj.id === i.id
                        return !nextProps.cart.some(filterCartItems)
                    }),
                    loadingData: false
                })
            } else {
                this.setState({
                    items: nextProps.items,
                    loadingData: false
                })
            }
        }
    }

    filter(state) {
        this.setState({
            onFilter: true
        })
    }

    toggleViewFormat(type) {
        this.setState({
            viewFormat: type
        })
    }

    public render() {
        const {
            items,
            viewFormat,
        } = this.state

        return <div className='col-md-12'>
            <div className='text-center'>
                <h2>Select an item, enter a quantity, and add it to your cart</h2>
                <hr />
            </div>
            {items.length > 0 &&
                <div>
                    <ItemFilters toggleViewFormat={this.toggleViewFormat.bind(this)} filter={this.filter.bind(this)} />
                    <br/>
                    <Items items={items} viewFormat={viewFormat} />
                </div>
            }
            {items.length == 0 &&
                <Spinner notice='...loading the inventory...' />
            }
        </div>;
    }
}

export default connect(
    (state: ApplicationState) => ({
        ...state.ping,
        ...state.items,
        ...state.cart
    }),
    ({
        ...Ping.actionCreators,
        ...ItemsStore.actionCreators,
        ...Cart.actionCreators
    })
)(ItemSelection as any) as typeof ItemSelection;