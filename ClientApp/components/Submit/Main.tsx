import * as React from 'react'
import { connect } from 'react-redux'
import { ApplicationState } from '../../store'
import * as Ping from '../../store/ping'
import * as ItemsStore from '../../store/items'
import ItemFilters from '../Filters/InventoryFilter'
import Items from './Items'
import Modal from 'react-responsive-modal'
import * as Cart from '../../store/cart'
import Spinner from '../Utilities/Spinner'
import { Helmet } from "react-helmet"
import MiscItem from './MiscItem'

export class ItemSelection extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            viewFormat: 'cards',
            onFilter: false,
            modalIsOpen: false
        }
    }

    componentDidMount() {
        let self = this
        window.scrollTo(0, 0)

        // ping server
        this.props.ping()

        // load inventory items
        this.props.getItems()

        if (this.props.items) {
            if (this.props.items.length != 0) {
                if (this.props.cart.length != 0) {
                    this.setState({
                        items: this.props.items.filter(function (i) {
                            const filterCartItems = obj => obj.obj === i.obj
                            return !self.props.cart.some(filterCartItems)
                        })
                    })
                } else {
                    this.setState({
                        items: this.props.items
                    })
                }
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.cart.length != 0) {
            this.setState({
                items: this.state.items.filter(function (i) {
                    const filterCartItems = obj => obj.obj === i.obj
                    return !nextProps.cart.some(filterCartItems)
                })
            })
        } else {
            this.setState({
                items: nextProps.items
            })
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
                    const filterCartItems = obj => obj.obj === i.obj
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
        this.setState({
            viewFormat: type
        })
    }

    addMiscItem() {
        this.setState({
            modalIsOpen: true
        })
    }

    closeModal() {
        this.setState({
            modalIsOpen: false
        });
    }

    public render() {
        const {
            items,
            viewFormat,
            onFilter,
            modalIsOpen
        } = this.state

        return <div className='col-md-12'>
            <Helmet>
                <style>{'body { background-color: rgba(92, 184, 92, .05); }'}</style>
            </Helmet>
            <ItemFilters
                toggleViewFormat={this.toggleViewFormat.bind(this)}
                filter={this.filter.bind(this)} />

            {items.length > 0 &&
                <div>
                    <Items items={items} viewFormat={viewFormat} />
                </div>
            }
            {items.length == 0 && onFilter == true &&
                <div>
                    <br />
                    <div className='col-md-12 text-center'>
                        <h1>Can't find what you're looking for?</h1>
                        <button onClick={this.addMiscItem.bind(this)} className='btn btn-success'>Add a miscellaneous item</button>
                    </div>
                </div>
            }
            {items.length == 0 && onFilter == false &&
                <Spinner notice='...loading the inventory...' />
            }
            <Modal
                open={modalIsOpen}
                onClose={this.closeModal.bind(this)}
                classNames={{
                    overlay: 'custom-overlay',
                    modal: 'custom-modal'
                }}
                center>
                <MiscItem closeModal={this.closeModal.bind(this)} />
            </Modal>
        </div>;
    }
}

export default connect(
    (state: ApplicationState) => ({
        ...state.cart,
        ...state.ping,
        ...state.items
    }),
    ({
        ...Ping.actionCreators,
        ...Cart.actionCreators,
        ...ItemsStore.actionCreators
    })
)(ItemSelection as any) as typeof ItemSelection;