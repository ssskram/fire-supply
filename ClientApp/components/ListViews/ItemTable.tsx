import * as React from 'react';
import { connect } from 'react-redux'
import Modal from 'react-responsive-modal'
import { ApplicationState } from '../../store'
import Table from "react-table"
import SelectQuantity from '../Cart/EnterQuantity'

export class ItemTable extends React.Component<any, any> {
    constructor() {
        super();
        this.state = {
            selectedItem: {},
            modalIsOpen: false
        }

        this.addtoCart = this.addtoCart.bind(this);
    }

    addtoCart(props) {
        this.setState({
            selectedItem: props.original
        }, function (this) {
            this.setState({
                modalIsOpen: true
            })
        })
    }

    closeModal() {
        this.setState({
            modalIsOpen: false,
            selectedItem: {}
        });
    }

    public render() {
        const {
            items
        } = this.props

        const {
            modalIsOpen,
            selectedItem
        } = this.state

        const columns = [{
            Header: 'Item',
            accessor: 'obj'
        }, {
            Header: 'Item type',
            accessor: 'family'
        }, {
            Header: 'Unit',
            accessor: 'unit'
        }, {
            Header: '',
            Cell: props=> <button className='btn btn-success' onClick={() => this.addtoCart(props)} >Select</button>
        }]

        return <div>
            <Table
                data={items}
                columns={columns}
                loading={false}
                minRows={0}
                pageSize={50}
                showPageSizeOptions={false}
                noDataText=''
                defaultSorted={[
                    {
                        id: 'obj',
                        asc: true
                    }
                ]}
            />
            <br />
            <br />
            <Modal
                open={modalIsOpen}
                onClose={this.closeModal.bind(this)}
                classNames={{
                    overlay: 'custom-overlay',
                    modal: 'custom-modal'
                }}
                center>
                <SelectQuantity
                    closeModal={this.closeModal.bind(this)}
                    item={selectedItem} />
            </Modal>
        </div>;
    }
}

export default connect(
    (state: ApplicationState) => ({

    }),
    ({

    })
)(ItemTable as any) as typeof ItemTable;