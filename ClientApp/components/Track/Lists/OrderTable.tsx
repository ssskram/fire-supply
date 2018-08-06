import * as React from 'react';
import { connect } from 'react-redux'
import { ApplicationState } from '../../../store'
import Table from "react-table"
import Moment from 'react-moment'

export class OrderTable extends React.Component<any, any> {
    constructor() {
        super();
    }

    public render() {
        const {
            orders
        } = this.props

        var sortedOrders = orders.sort(function (a, b) {
            return +new Date(b.orderSubmitted) - +new Date(a.orderSubmitted);
        })

        const columns = [{
            Header: 'Submitted',
            accessor: 'orderSubmitted',
            Cell: props => <Moment format="MM/DD/YYYY HH:mm" date={props.value} />
        }, {
            Header: 'House',
            accessor: 'house'
        }, {
            Header: 'Supplies',
            accessor: 'orderType'
        }, {
            Header: 'Ordered by',
            accessor: 'userFullName'
        }, {
            Header: 'Status',
            accessor: 'status'
        }, {
            Header: '',
            Cell: props => <button className='btn btn-success' onClick={() => this.props.openItem(props.original)}>View</button>
        }]

        return <div>
            <Table
                data={sortedOrders}
                columns={columns}
                loading={false}
                minRows={0}
                pageSize={50}
                showPageSizeOptions={false}
                noDataText=''
                getTdProps={() => ({
                    style: {
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                    }
                })}
            />
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
)(OrderTable as any) as typeof OrderTable;