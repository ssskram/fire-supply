import * as React from 'react';
import { connect } from 'react-redux'
import { ApplicationState } from '../../../store'
import Table from "react-table"

export class OrderTable extends React.Component<any, any> {
    constructor() {
        super();
    }


    public render() {
        const {
            orders
        } = this.props

        const columns = [{
            Header: 'Submitted',
            accessor: 'orderSubmitted'
        }, {
            Header: 'House',
            accessor: 'house'
        }, {
            Header: 'Submitted by',
            accessor: 'user'
        }, {
            Header: 'Status',
            accessor: 'status'
        }, {
            Header: '',
            Cell: props=> <button className='btn btn-success'>View</button>
        }]

        return <div>
            <Table
                data={orders}
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
                defaultSorted={[
                    {
                        id: 'obj',
                        asc: true
                    }
                ]}
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