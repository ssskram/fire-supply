import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import Card from './Lists/OrderCard'
import Table from './Lists/OrderTable'
import Modal from 'react-responsive-modal'

export class Orders extends React.Component<any, any> {
    constructor() {
        super();
        this.state = {
            modalIsOpen: false,
            selectedItem: {}
        }
        this.openItem = this.openItem.bind(this);

    }

    openItem(item) {
        console.log(item)
        this.setState({
            selectedItem: item,
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
            selectedItem
        } = this.state

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
                    <div>
                        <a className='btn btn-success' target='_blank' href={selectedItem.link}>Open</a>
                    </div>
                }
                {selectedItem.isOld != true &&
                    <div>
                        <h1>FRESH</h1>
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