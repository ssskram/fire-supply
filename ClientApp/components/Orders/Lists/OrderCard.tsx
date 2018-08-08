import * as React from 'react'
import { connect } from 'react-redux'
import { ApplicationState } from '../../../store'
import Paging from '../../Utilities/Paging'
import LoadingImage from '../../Utilities/LoadingImage'
import Moment from 'react-moment'

const feedback = {
    backgroundColor: 'rgba(92, 184, 92, .2)',
    padding: '5px',
    margin: '5px',
    borderRadius: '10px'
}

const imgStyle = {
    maxHeight: '180px',
    borderRadius: '10px',
    margin: '0 auto'
}

const emergencyOrder = {
    color: 'red'
}

export class OrderCard extends React.Component<any, any> {
    constructor() {
        super();
        this.state = {
            currentPage: 1,
            itemsPerPage: 45,
        }
    }

    componentWillReceiveProps(nextProps) {
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

    public render() {
        const {
            currentPage,
            itemsPerPage,
        } = this.state

        const {
            orders
        } = this.props

        var sortedOrders = orders.sort(function (a, b) {
            return +new Date(b.orderSubmitted) - +new Date(a.orderSubmitted);
        })

        // Logic for paging
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentItems = sortedOrders.slice(indexOfFirstItem, indexOfLastItem);
        const renderItems = currentItems.map((item) => {
            const encodedHouse = item.house.split(' ').join('_');
            const imgUrl = "https://tools.wprdc.org/images/pittsburgh/facilities/" + encodedHouse + ".jpg"
            return (
                <div className="col-md-12" key={item.id}>
                    <div className="panel">
                        <div className="panel-body text-center">
                            <div className='col-md-4 hidden-sm hidden-xs'>
                                <LoadingImage style={imgStyle} src={imgUrl} />
                            </div>
                            <div className='col-md-4'>
                                <h4><b>{item.house}</b></h4>
                                <h4><Moment format="MM/DD/YYYY HH:mm" date={item.orderSubmitted} /></h4>
                                <h4>{item.userFullName}</h4>
                                <h4>Supplies: <b>{item.orderType}</b></h4>
                                {item.comments &&
                                    <h5><i>"{item.comments}"</i></h5>
                                }
                                <div className='hidden-sm hidden-xs'>
                                    <button className='btn btn-success' onClick={() => this.props.openItem(item)}>View</button>
                                </div>
                            </div>
                            <div className='col-md-4'>
                                {item.emergency == 'Yes' &&
                                    <h4 style={emergencyOrder}>Emergency Order</h4>
                                }
                                <div style={feedback}>
                                    <h5><b>Supply Feedback</b></h5>
                                    <h5>Order status: <b>{item.status}</b></h5>
                                    <h5>Last activity: <b><Moment format="MM/DD/YYYY HH:mm" date={item.lastModified} /></b></h5>
                                    {item.supplyComments &&
                                        <h5><i>"{item.supplyComments}"</i></h5>
                                    }
                                </div>
                                <div className='hidden-md hidden-lg hidden-xl'>
                                    <button className='btn btn-success' onClick={() => this.props.openItem(item)}>View</button>
                                </div>
                            </div>
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
                count={sortedOrders}
                currentPage={currentPage}
                totalPages={pageNumbers}
                next={this.handleNextClick.bind(this)}
                prev={this.handlePreviousClick.bind(this)} />
            <br />
            <br />
        </div>;
    }
}

export default connect(
    (state: ApplicationState) => ({

    }),
    ({

    })
)(OrderCard as any) as typeof OrderCard;