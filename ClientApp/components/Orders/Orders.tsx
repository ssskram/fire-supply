import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import Card from './Lists/OrderCard'
import Table from './Lists/OrderTable'
import Modal from 'react-responsive-modal'
import FullOrder from './FullOrder'

const padding = {
    padding: '15px'
}

const qtyColor = {
    color: '#449d44'
}

export class Orders extends React.Component<any, any> {
    constructor() {
        super();
        this.state = {
            modalIsOpen: false,
            selectedItem: {},
            selectedItems: []
        }
        this.openItem = this.openItem.bind(this);
    }

    openItem(item) {
        this.setState({
            selectedItem: item,
            selectedItems: item.items,
            modalIsOpen: true
        })
    }

    closeModal() {
        this.setState({
            modalIsOpen: false
        })
    }

    public render() {
        const {
            orders,
            viewFormat,
            clearFilters
        } = this.props

        const {
            modalIsOpen,
            selectedItem,
            selectedItems
        } = this.state

        let items
        if (selectedItems) {
            items = selectedItems.map((item) => {
                return (
                    <div className="col-sm-12" key={item.obj}>
                        <div className="panel">
                            <div className="panel-body text-center">
                                <h3>{item.obj}</h3>
                                <h3 style={qtyColor}><b>{item.quantityOrdered}</b></h3>
                                <h5>Unit: <b>{item.unit}</b></h5>
                            </div>
                        </div>
                    </div>
                )
            })
        }

        return <div>
            {viewFormat == 'cards' &&
                <Card orders={orders} openItem={this.openItem} clearFilters={clearFilters} />
            }
            {viewFormat == 'table' &&
                <Table orders={orders} openItem={this.openItem} clearFilters={clearFilters} />
            }
            <Modal
                open={modalIsOpen}
                onClose={this.closeModal.bind(this)}
                classNames={{
                    overlay: 'custom-overlay',
                    modal: 'custom-modal'
                }}
                center>
                {selectedItem.isOld == true &&
                    <div style={padding}>
                        <FullOrder order={selectedItem} />
                        <br/>
                        <div className='col-md-12 text-center'>
                            <a className='btn btn-success' target='_blank' href={selectedItem.link}>Click here to view items ordered</a>
                        </div>
                    </div>
                }
                {selectedItem.isOld != true &&
                    <div style={padding}>
                        <FullOrder order={selectedItem} />
                        <h3>Items</h3>
                        <hr />
                        {items}
                    </div>
                }

            </Modal>
        </div>;
    }
}

export default connect(
    (state: ApplicationState) => ({

    }),
    ({

    })
)(Orders as any) as typeof Orders;