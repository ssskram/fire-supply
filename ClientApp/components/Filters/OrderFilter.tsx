import * as React from 'react'
import { connect } from 'react-redux'
import { ApplicationState } from '../../store'
import Select from '../FormElements/select'
import * as Houses from '../../store/houses'
import Datepicker from '../FormElements/datepicker'

const statuses = [
    { value: '', label: 'All', name: 'status' },
    { value: 'Order Submitted', label: 'Order Submitted', name: 'status' },
    { value: 'Approved', label: 'Approved', name: 'status' },
    { value: 'Pending Higher Approval', label: 'Pending Higher Approval', name: 'status' },
    { value: 'Partially Delivered', label: 'Partially Delivered', name: 'status' },
    { value: 'Complete', label: 'Complete', name: 'status' },
    { value: 'Rejected', label: 'Rejected', name: 'status' }
]

const itemTypes = [
    { value: '', label: 'All', name: 'itemsOrdered' },
    { value: 'House', label: 'House Supplies', name: 'itemsOrdered' },
    { value: 'Office', label: 'Office Supplies', name: 'itemsOrdered' },
    { value: 'Medical', label: 'Medical Supplies', name: 'itemsOrdered' },
    { value: 'Medicine', label: 'Medicine', name: 'itemsOrdered' },
    { value: 'Equipment', label: 'Equipment', name: 'itemsOrdered' },
]

const marginTop = {
    marginTop: '15px'
}

export class OrderFilter extends React.Component<any, any> {
    constructor() {
        super();
        this.state = {
            houseOptions: [{ "value": '...loading...', "label": '...loading...' }],
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

    componentDidMount() {
        // load engine houses
        this.props.loadHouses()
    }

    componentWillReceiveProps(nextProps) {
        let self = this
        // add options to select
        var futureOptions: any[] = [];
        nextProps.houses.forEach(function (element) {
            var json = { "value": element.name, "label": element.name, "name": 'house' };
            futureOptions.push(json)
        })
        self.setState({
            houseOptions: futureOptions
        })
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
            houseOptions,
            house,
            orderDate,
            status,
            itemsOrdered,
            clearDate,
            filters,
            viewFormat
        } = this.state

        return <div>
            <div className='row'>
                <div style={marginTop}>
                    <div className='col-md-4 col-sm-12 text-center'>
                        {filters === true &&
                            <button className='btn btn-secondary' onClick={this.hideFilters.bind(this)}>Hide filters</button>
                        }
                        {filters === false &&
                            <button className='btn btn-secondary' onClick={this.showFilters.bind(this)}>Show filters</button>
                        }
                    </div>
                    <div className='col-md-4 col-sm-12 text-center'>
                        <button className='btn btn-secondary' onClick={this.clearFilters.bind(this)}>Clear all filters</button>
                    </div>
                    <div className='col-md-4 col-sm-12 text-center'>
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
                                header='House'
                                placeholder='Filter by house'
                                onChange={this.handleChildSelect.bind(this)}
                                multi={false}
                                options={houseOptions}
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
                                header='Order Contents'
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
        ...state.houses
    }),
    ({
        ...Houses.actionCreators
    })
)(OrderFilter as any) as typeof OrderFilter;