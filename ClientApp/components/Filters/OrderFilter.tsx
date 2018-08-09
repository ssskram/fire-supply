import * as React from 'react'
import { connect } from 'react-redux'
import { ApplicationState } from '../../store'
import Select from '../FormElements/select'
import * as Houses from '../../store/houses'
import Datepicker from '../FormElements/datepicker'
import classnames from 'classnames'

const headerWidth = {
    width: '80%'
}

const filterContainer = {
    padding: '10px',
    marginBottom: '25px',
    borderRadius: '20px',
    border: '1px solid #BF1E2E'
}

const imgSize = {
    maxHeight: '150px'
}

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

const marginLeft = {
    marginLeft: '30px'
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

        if (this.props.filterState != nextProps.filterState) {
            if (Object.keys(nextProps.filterState).length === 0 && nextProps.filterState.constructor === Object) {
                this.setState({
                    house: '',
                    orderDate: '',
                    status: '',
                    itemsOrdered: ''
                })
            }
        }

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
            orderDate: date,
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
            this.props.all()
        })
    }

    toggleFilters() {
        if (this.state.filters == true) {
            this.setState({
                filters: false
            });
        } else {
            this.setState({
                filters: true
            });
        }
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
        let self = {
            house: this.state.house,
            orderDate: this.state.orderDate,
            status: this.state.status,
            itemsOrdered: this.state.itemsOrdered
        }
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
            filters
        } = this.state

        const {
            allOrMine
        } = this.props

        let allBtn = classnames({
            'btn': true,
            'btn-secondary': true,
            'btn-highlight': allOrMine == "All"
        });

        let myBtn = classnames({
            'btn': true,
            'btn-secondary': true,
            'btn-highlight': allOrMine == "Mine"
        });

        return <div>
            <div className='row'>
                <div className='col-md-12'>
                    <div style={headerWidth} className='pull-left'>
                        {allOrMine == "Mine" &&
                            <h1 style={marginLeft}>My orders - {this.props.count}</h1>
                        }
                        {allOrMine == "All" &&
                            <h1 style={marginLeft}>All orders - {this.props.count}</h1>
                        }
                        <hr />
                        <div className='col-xs-12 col-md-3'>
                            <button onClick={this.props.all} className={allBtn}>All Orders</button>
                        </div>
                        <div className='col-xs-12 col-md-3'>
                            <button onClick={this.props.mine} className={myBtn}>My Orders</button>
                        </div>
                        <div className='col-xs-12 col-md-2'>
                            <button className='btn btn-secondary' onClick={this.toggleFilters.bind(this)}><span className='glyphicon glyphicon-search'></span></button>
                        </div>
                        <div className='col-xs-12 col-md-2'>
                            <button className='btn btn-secondary hidden-sm hidden-xs' onClick={this.toggleViewFormat.bind(this)}><span className='glyphicon glyphicon-eye-open'></span></button>
                        </div>
                    </div>
                    <div className='hidden-sm hidden-xs hidden-md pull-right'>
                        <img style={imgSize} src='./images/fire.png' className="img-responsive" />
                    </div>
                </div>
            </div>
            <br />
            {filters == true &&
                <div style={filterContainer} className='form-group'>
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
                    <div className='text-center'>
                        <button className='btn btn-warning' onClick={this.clearFilters.bind(this)}>Clear</button>
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