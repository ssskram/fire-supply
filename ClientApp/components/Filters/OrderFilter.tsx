import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import Select from '../FormElements/select'
import Datepicker from '../FormElements/datepicker';

const houses = [
    { value: '', label: 'All', name: 'house' },
    { value: '1', label: '1', name: 'house' },
    { value: '2', label: '2', name: 'house' }
]

const statuses = [
    { value: '', label: 'All', name: 'status' },
    { value: 'Open', label: 'Open', name: 'status' },
    { value: 'Closed', label: 'Closed', name: 'status' }
]

const itemTypes = [
    { value: '', label: 'All', name: 'itemsOrdered' },
    { value: 'House', label: 'House', name: 'itemsOrdered' },
    { value: 'Medical', label: 'Medical', name: 'itemsOrdered' }
]

const marginTop = {
    marginTop: '15px'
}

export class OrderFilter extends React.Component<any, any> {
    constructor() {
        super();
        this.state = {
            house: '',
            orderDate: '',
            status: '',
            itemsOrdered: '',

            // utilities
            clearDate: true,
            filters: false,
            viewFormat: 'cards'
        }
    }

    handleChildDate(date) {
        this.setState({
            date: date,
            clearDate: false
        }, function (this) {
            this.filter()
        })
    }

    handleChildSelect(event) {
        this.setState({
            [event.name]: event.value
        }, function (this) {
            this.filter()
        })
    }

    clearFilters() {
        this.setState({
            house: '',
            orderDate: '',
            status: '',
            itemsOrdered: ''
        }, function (this) {
            this.filter()
        })
    }

    hideFilters() {
        this.setState({
            filters: false
        });
    }

    showFilters() {
        this.setState({
            filters: true
        });
    }

    toggleViewFormat() {
        window.scrollTo(0, 0)
        if (this.state.viewFormat == 'cards') {
            this.setState({
                viewFormat: 'table'
            })
            this.props.toggleViewFormat('table')
        }
        if (this.state.viewFormat == 'table') {
            this.setState({
                viewFormat: 'cards'
            })
            this.props.toggleViewFormat('cards')
        }
    }

    filter() {
        let self = this.state
        this.props.filter(self)
    }

    public render() {
        const {
            house,
            orderDate,
            status,
            itemsOrdered,
            clearDate,
            filters,
            viewFormat
        } = this.state

        const {
            countOrders
        } = this.props

        return <div>
            <div className='row'>
                <div className='col-md-3 col-sm-12'>
                    <h1>{countOrders} Orders</h1>
                </div>
                <div style={marginTop}>
                    <div className='col-md-3 col-sm-12 text-center'>
                        {filters === true &&
                            <button className='btn btn-secondary' onClick={this.hideFilters.bind(this)}>Hide filters</button>
                        }
                        {filters === false &&
                            <button className='btn btn-secondary' onClick={this.showFilters.bind(this)}>Show filters</button>
                        }
                    </div>
                    <div className='col-md-3 col-sm-12 text-center'>
                        <button className='btn btn-secondary' onClick={this.clearFilters.bind(this)}>Clear all filters</button>
                    </div>
                    <div className='col-md-3 col-sm-12 text-center'>
                        {viewFormat == 'cards' &&
                            <button className='btn btn-secondary' onClick={this.toggleViewFormat.bind(this)}>Toggle table view</button>
                        }
                        {viewFormat == 'table' &&
                            <button className='btn btn-secondary' onClick={this.toggleViewFormat.bind(this)}>Toggle card view</button>
                        }
                    </div>
                </div>
            </div>
            <hr />
            {filters == true &&
                <div className='form-group'>
                    <div className='row'>
                        <div className='col-md-6'>
                            <Select
                                value={house}
                                name="house"
                                header='Engine House'
                                placeholder='Filter by house'
                                onChange={this.handleChildSelect.bind(this)}
                                multi={false}
                                options={houses}
                            />
                        </div>
                        <div className='col-md-6'>
                            <Select
                                value={status}
                                name="status"
                                header='Order Status'
                                placeholder='Filter by status'
                                onChange={this.handleChildSelect.bind(this)}
                                multi={false}
                                options={statuses}
                            />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-6'>
                            <Datepicker
                                value={orderDate}
                                clearDate={clearDate}
                                name="orderDate"
                                header="Order Date"
                                placeholder="Filter by date"
                                callback={this.handleChildDate.bind(this)}
                            />
                        </div>
                        <div className='col-md-6'>
                            <Select
                                value={itemsOrdered}
                                name="itemsOrdered"
                                header='Order Type'
                                placeholder='Filter by items ordered'
                                onChange={this.handleChildSelect.bind(this)}
                                multi={false}
                                options={itemTypes}
                            />
                        </div>
                    </div>
                </div>
            }
        </div>;
    }
}

export default connect(
    (state: ApplicationState) => ({

    }),
    ({

    })
)(OrderFilter as any) as typeof OrderFilter;