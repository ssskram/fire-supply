import * as React from 'react'
import Modal from 'react-responsive-modal'
import { connect } from 'react-redux'
import { ApplicationState } from '../../../store'
import Paging from '../../Utilities/Paging'
import SelectQuantity from '../../Cart/EnterQuantity'

const btnColor = {
    backgroundColor: 'rgba(92, 184, 92, .8)'
}

const fixedHeight = {
    height: '225px',
}

export class ItemCard extends React.Component<any, any> {
    constructor() {
        super();
        this.state = {
            currentPage: 1,
            itemsPerPage: 45,
            selectedItem: {},
            modalIsOpen: false
        }
        this.addtoCart = this.addtoCart.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentWillReceiveProps (nextProps) {
        if (this.props.items != nextProps.items) {
            this.setState({
                currentPage: 1
            })
        }
    }
    
    handleNextClick() {
        window.scrollTo(0, 0)
        let current = this.state.currentPage
        this.setState({
            currentPage: current + 1
        });
    }

    handlePreviousClick() {
        window.scrollTo(0, 0)
        let current = this.state.currentPage
        this.setState({
            currentPage: current - 1
        });
    }

    addtoCart(item) {
        this.setState({
            selectedItem: item
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
            currentPage,
            itemsPerPage,
            selectedItem,
            modalIsOpen
        } = this.state

        const {
            items
        } = this.props

        // Logic for paging
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
        const renderItems = currentItems.map((item) => {
            return (
                <div style={fixedHeight} className="col-lg-4 col-md-6 col-sm-12" key={item.id}>
                    <div className="panel">
                        <div className="panel-body text-center">
                            <h4>{item.obj}</h4>
                            <h5>Item type: <b>{item.family}</b></h5>
                            <h5>Unit: <b>{item.unit}</b></h5>
                            <button style={btnColor} className='btn btn-success' onClick={() => this.addtoCart(item)}>Select</button>
                        </div>
                    </div>
                </div>
            )
        })

        // Logic for displaying page numbers
        const pageNumbers: any[] = []
        for (let i = 1; i <= Math.ceil(items.length / itemsPerPage); i++) {
            pageNumbers.push(i);
        }

        return <div>
            <div className='row'>
                {renderItems}
            </div>
            <br />
            <Paging
                count={items}
                currentPage={currentPage}
                totalPages={pageNumbers}
                next={this.handleNextClick.bind(this)}
                prev={this.handlePreviousClick.bind(this)} />
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
               <SelectQuantity closeModal={this.closeModal.bind(this)} item={selectedItem}/>
            </Modal>
        </div>;
    }
}

export default connect(
    (state: ApplicationState) => ({

    }),
    ({

    })
)(ItemCard as any) as typeof ItemCard;