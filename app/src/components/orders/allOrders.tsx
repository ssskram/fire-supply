import * as React from 'react'
import HydrateStore from '../utilities/hydrateStore'
import { connect } from 'react-redux'
import { ApplicationState } from '../../store'
import * as types from '../../store/types'
import * as orders from '../../store/orders'
import * as userProfile from '../../store/userProfile'
import Card from './markup/card'
import NoOrders from './markup/noOrders'
import ViewOrder from './markup/viewOrder'
import Filters from './markup/filters'
import Header from './markup/header'
import { returnPageNumber, returnCurrentItems } from './functions/paging'
import Paging from '../utilities/paging'

type props = {
    orders: types.order[],
    userProfile: types.userProfile
}

type state = {
    currentPage: number
    ordersByDept: types.order[]
    viewOrder: types.order
    onFilter: boolean
}

export class AllOrders extends React.Component<props, state> {
    constructor(props) {
        super(props)
        this.state = {
            currentPage: 1,
            ordersByDept: props.orders.filter(order => order.department == props.userProfile.department),
            viewOrder: undefined,
            onFilter: false,
        }
    }

    componentDidMount() {
        window.scrollTo(0,0)
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.onFilter == false)
        this.setState({
            ordersByDept: nextProps.orders.filter(order => order.department == nextProps.userProfile.department),
        })
    }

    filter(filteredOrders) {
        this.setState({
            onFilter: true,
            ordersByDept: filteredOrders
        })
    }

    render() {
        const { ordersByDept, currentPage } = this.state
        const currentItems = returnCurrentItems(ordersByDept, currentPage)
        const pageNumbers = returnPageNumber(ordersByDept)
        const renderItems = currentItems.map((order, key) => {
            return (
                <Card
                    onClick={(order) => this.setState({ viewOrder: order })}
                    key={key}
                    order={order}
                />
            )
        })

        return (
            <div className='col-md-12'>
                <Header 
                    text='ALL ORDERS'
                    userProfile={this.props.userProfile}
                />
                <hr />
                <HydrateStore />
                <Filters
                    orders={this.props.orders.filter(order => order.department == this.props.userProfile.department)}
                    filter={this.filter.bind(this)}
                />
                {ordersByDept.length > 0 &&
                    <div className='row'>
                        {renderItems}
                        <br />
                        <br />
                        <Paging
                            count={ordersByDept}
                            currentPage={currentPage}
                            totalPages={pageNumbers}
                            next={() => {
                                window.scrollTo(0, 0)
                                this.setState({ currentPage: this.state.currentPage + 1 })
                            }}
                            prev={() => {
                                window.scrollTo(0, 0)
                                this.setState({ currentPage: this.state.currentPage - 1 })
                            }} />
                        <br />
                        <br />
                    </div>
                }
                {ordersByDept.length == 0 &&
                    <NoOrders />
                }
                {this.state.viewOrder &&
                    <ViewOrder
                        order={this.state.viewOrder}
                        closeView={() => this.setState({ viewOrder: undefined })}
                    />
                }
            </div>
        )
    }
}

export default connect(
    (state: ApplicationState) => ({
        ...state.orders,
        ...state.userProfile
    }),
    ({
        ...orders.actionCreators,
        ...userProfile.actionCreators
    })
)(AllOrders as any)