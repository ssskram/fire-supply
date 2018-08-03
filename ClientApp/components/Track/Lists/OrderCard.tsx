import * as React from 'react'
import Modal from 'react-responsive-modal'
import { connect } from 'react-redux'
import { ApplicationState } from '../../../store'
import Paging from '../../Utilities/Paging'

const fixedHeight = {
    height: '225px',
}

export class OrderCard extends React.Component<any, any> {
    constructor() {
        super();
        this.state = {
            currentPage: 1,
            itemsPerPage: 45,
            selectedItem: {},
            modalIsOpen: false
        }
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
            orders
        } = this.props

        // Logic for paging
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentItems = orders.slice(indexOfFirstItem, indexOfLastItem);
        const renderItems = currentItems.map((item) => {
            return (
                <div style={fixedHeight} className="col-lg-4 col-md-6 col-sm-12" key={item.id}>
                    <div className="panel">
                        <div className="panel-body text-center">
                            <h4>{item.user}</h4>
                            <h5>House: <b>{item.house}</b></h5>
                            <h5>Comments: <b>{item.comments}</b></h5>
                        </div>
                    </div>
                </div>
            )
        })

        // Logic for displaying page numbers
        const pageNumbers: any[] = []
        for (let i = 1; i <= Math.ceil(orders.length / itemsPerPage); i++) {
            pageNumbers.push(i);
        }

        return <div>
            <div className='row'>
                {renderItems}
            </div>
            <br />
            <Paging
                count={orders}
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
            </Modal>
        </div>;
    }
}

export default connect(
    (state: ApplicationState) => ({

    }),
    ({

    })
)(OrderCard as any) as typeof OrderCard;