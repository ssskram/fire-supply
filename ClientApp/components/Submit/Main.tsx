import * as React from 'react'
import { connect } from 'react-redux'
import { ApplicationState } from '../../store'
import * as Ping from '../../store/ping'
import * as ItemsStore from '../../store/items'
import ItemFilters from '../Filters/InventoryFilter'
import Items from './Items'
import Spinner from '../Utilities/Spinner'
import * as Cart from '../../store/cart'
import { Helmet } from "react-helmet"

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
            if (this.props.cart.length != 0) {
                this.setState({
                    items: this.props.items.filter(function (i) {
                        const filterCartItems = obj => obj.id === i.id
                        return !self.props.cart.some(filterCartItems)
                    })
                })
            } else {
                this.setState({
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
                    items: nextProps.items.filter(function (i) {
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
        let cart = this.props.cart
        if (state.obj) {
            var obj = state.obj.toLowerCase()
        }
        if (state.family) {
            var family = state.family.toLowerCase()
        }
        var filtered = this.props.items.filter(function (item) {
            if (obj) {
                if (!item.obj.toLowerCase().includes(obj)) {
                    return false
                }
            }
            if (family) {
                if (!item.family.toLowerCase().includes(family)) {
                    return false
                }
            }
            return true
        })
        if (cart.length != 0) {
            this.setState({
                items: filtered.filter(function (i) {
                    const filterCartItems = obj => obj.id === i.id
                    return !cart.some(filterCartItems)
                }),
                onFilter: true
            })
        } else {
            this.setState({
                items: filtered,
                onFilter: true
            })
        }
    }

    toggleViewFormat(type) {
        console.log(type)
        this.setState({
            viewFormat: type
        })
    }

    clearFilters() {
        let cart = this.props.cart
        if (cart.length != 0) {
            this.setState({
                items: this.props.items.filter(function (i) {
                    const filterCartItems = obj => obj.id === i.id
                    return !cart.some(filterCartItems)
                }),
                onFilter: false
            })
        } else {
            this.setState({
                items: this.props.items,
                onFilter: false
            })
        }

    }

    public render() {
        const {
            items,
            viewFormat,
            onFilter
        } = this.state

        return <div className='col-md-12'>
            <Helmet>
                <style>{'body { background-color: rgba(92, 184, 92, .05); }'}</style>
            </Helmet>
            <div className='text-center'>
                <h2>Select an item, enter a quantity, and add it to your cart</h2>
                <hr />
            </div>
            <ItemFilters toggleViewFormat={this.toggleViewFormat.bind(this)} filter={this.filter.bind(this)} clear={this.clearFilters.bind(this)} />
            {items.length > 0 &&
                <div>
                    <br />
                    <Items items={items} viewFormat={viewFormat} />
                </div>
            }
            {items.length == 0 && onFilter == true &&
                <div>
                    <br />
                    <div className='col-md-12 text-center'>
                        <h1>Sorry, I can't find anything matching those parameters</h1>
                    </div>
                </div>
            }
            {items.length == 0 && onFilter == false &&
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