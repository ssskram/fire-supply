import * as React from 'react'
import * as types from '../../../store/types'
import ReactTable from "react-table"
import AddToCart from '../../addToCart'
import "react-table/react-table.css"

type props = {
    items: Array<types.item>
}

export default class ItemCards extends React.Component<props, {}>{

    render() {
        const columns = [{
            Header: 'Item',
            accessor: 'name',
            Cell: props => <b>{props.value}</b>
        }, {
            Header: '',
            accessor: 'cartegraphID',
            Cell: props => <AddToCart item={props.original} />,
            maxWidth: 125
        }, {
            Header: 'Type',
            accessor: 'type',
        }]

        return (
            <div className='col-md-12'>
                <ReactTable
                    data={this.props.items}
                    columns={columns}
                    loading={false}
                    minRows={0}
                    pageSize={100}
                    showPagination={true}
                    showPageSizeOptions={false}
                    noDataText=''
                    getTdProps={() => ({
                        style: {
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            fontSize: '14px'
                        }
                    })}
                />
            </div>
        )
    }

}