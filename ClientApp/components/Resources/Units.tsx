import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import * as ItemsStore from '../../store/items'
import Table from "react-table";
import Spinner from '../Utilities/Spinner'

const columns = [{
    Header: 'Item',
    accessor: 'obj'
}, {
    Header: 'Unit',
    accessor: 'unit'
}]

const padding = {
    padding: '20px'
}
export class UnitsofIssue extends React.Component<any, any> {

    componentDidMount() {
        window.scrollTo(0, 0)

        // load inventory items
        this.props.getItems()
    }

    public render() {
        const {
            items
        } = this.props

        return <div>
            <div className='row col-md-12'>
                <h2>Units of issue</h2>
                <hr />
            </div>
            <div className='row'>
                <div style={padding} className='col-md-4'>
                    <h3>House supplies</h3>
                    <Table
                        data={items.filter(item => item.family == 'House')}
                        columns={columns}
                        loading={false}
                        minRows={0}
                        pageSize={20}
                        showPageSizeOptions={false}
                        noDataText=''
                        defaultSorted={[
                            {
                                id: 'obj',
                                asc: true
                            }
                        ]}
                    />
                </div>
                <div style={padding} className='col-md-4'>
                    <h3>Office supplies</h3>
                    <Table
                        data={items.filter(item => item.family == 'Office')}
                        columns={columns}
                        loading={false}
                        minRows={0}
                        pageSize={20}
                        showPageSizeOptions={false}
                        noDataText=''
                        defaultSorted={[
                            {
                                id: 'obj',
                                asc: true
                            }
                        ]}
                    />
                </div>
                <div style={padding} className='col-md-4'>
                    <h3>Medical supplies</h3>
                    <Table
                        data={items.filter(item => item.family == 'Medical')}
                        columns={columns}
                        loading={false}
                        minRows={0}
                        pageSize={20}
                        showPageSizeOptions={false}
                        noDataText=''
                        defaultSorted={[
                            {
                                id: 'obj',
                                asc: true
                            }
                        ]}
                    />
                </div>
            </div>
            <div style={padding} className='col-md-6'>
                <h3>Medicine</h3>
                <Table
                    data={items.filter(item => item.family == 'Medicine')}
                    columns={columns}
                    loading={false}
                    minRows={0}
                    pageSize={20}
                    showPageSizeOptions={false}
                    noDataText=''
                    defaultSorted={[
                        {
                            id: 'obj',
                            asc: true
                        }
                    ]}
                />
            </div>
            <div style={padding} className='col-md-6'>
                <h3>Equipment</h3>
                <Table
                    data={items.filter(item => item.family == 'Equipment')}
                    columns={columns}
                    loading={false}
                    minRows={0}
                    pageSize={20}
                    showPageSizeOptions={false}
                    noDataText=''
                    defaultSorted={[
                        {
                            id: 'obj',
                            asc: true
                        }
                    ]}
                />
            </div>
            {items.length == 0 &&
                <Spinner notice='...loading the inventory...' />
            }
        </div>;
    }
}

export default connect(
    (state: ApplicationState) => ({
        ...state.items
    }),
    ({
        ...ItemsStore.actionCreators
    })
)(UnitsofIssue as any) as typeof UnitsofIssue;