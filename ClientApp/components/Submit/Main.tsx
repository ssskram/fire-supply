import * as React from 'react'
import { connect } from 'react-redux'
import { ApplicationState } from '../../store'
import * as Ping from '../../store/ping'
import * as ItemsStore from '../../store/items'
import ItemFilters from './../Filters/InventoryFilter'
import Items from './Items'
import Modal from 'react-responsive-modal'

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
        window.scrollTo(0, 0)

        if (this.props.items.length != 0) {
            this.setState({
                items: this.props.items
            })
        }

        // load inventory items
        this.props.getItems()

        // ping server
        this.props.ping()
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.onFilter == false) {
            this.setState({
                items: nextProps.items,
                loadingData: false
            })
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

    closeModal() {
        // just required for modal lib
    }

    public render() {
        const {
            items,
            viewFormat,
        } = this.state

        return <div>
            <div className='row col-md-12'>
                <h2>Select an item, choose a quantity, and add it to your cart</h2>
                <hr />
            </div>
            {items.length > 0 &&
                <div className='row col-md-12'>
                    <ItemFilters toggleViewFormat={this.toggleViewFormat.bind(this)} filter={this.filter.bind(this)} />
                    <Items items={items} viewFormat={viewFormat} />
                </div>
            }
            {items.length == 0 &&
                <Modal
                    open={true}
                    onClose={this.closeModal.bind(this)}
                    classNames={{
                        overlay: 'spinner-overlay',
                        modal: 'spinner-modal'
                    }}
                    animationDuration={1000}
                    closeOnEsc={false}
                    closeOnOverlayClick={false}
                    showCloseIcon={false}
                    center>
                    <div className="loader"></div>
                    ...loading the inventory...
            </Modal>
            }
        </div>;
    }
}

export default connect(
    (state: ApplicationState) => ({
        ...state.ping,
        ...state.items
    }),
    ({
        ...Ping.actionCreators,
        ...ItemsStore.actionCreators
    })
)(ItemSelection as any) as typeof ItemSelection;