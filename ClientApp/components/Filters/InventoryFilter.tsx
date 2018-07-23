import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import Select from '../FormElements/select'
import Input from '../FormElements/input'

const families = [
    { value: '', label: 'All', name: 'family' },
    { value: 'House Supplies', label: 'House', name: 'family' },
    { value: 'Office Supplies', label: 'Office', name: 'family' },
    { value: 'Medical Supplies', label: 'Medical', name: 'family' },
    { value: 'Medicine', label: 'Medicine', name: 'family' },
    { value: 'Equipment', label: 'Equipment', name: 'family' },
]

export class InventoryFilter extends React.Component<any, any> {
    constructor() {
        super();
        this.state = {
            obj: '',
            family: '',

            // utilities
            viewFormat: 'cards',
            filters: true
        }
    }

    handleChildChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        }, function (this) {
            this.filter()
        });
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
            obj: '',
            family: ''
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
            obj,
            family,
            filters,
            viewFormat
        } = this.state



        return <div>
            <div className='row'>
                <div>
                    <div className='col-md-4 col-sm-12 text-center'>
                        {filters === true &&
                            <button className='btn btn-secondary' onClick={this.hideFilters.bind(this)}>Hide filters</button>
                        }
                        {filters === false &&
                            <button className='btn btn-secondary' onClick={this.showFilters.bind(this)}>Show filters</button>
                        }
                    </div>
                    <div className='col-md-4 col-sm-12 text-center'>
                        <button className='btn btn-secondary' onClick={this.clearFilters.bind(this)}>Clear filters</button>
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
            {filters == true &&
                <div className='form-group'>
                    <div className='row'>
                        <div className='col-md-6'>
                            <Input
                                value={obj}
                                name="obj"
                                header="Search for an item"
                                placeholder="Enter item name"
                                callback={this.handleChildChange.bind(this)}
                            />
                        </div>
                        <div className='col-md-6'>
                            <Select
                                value={family}
                                name="family"
                                header='Filter by item type'
                                placeholder='Select an item type'
                                onChange={this.handleChildSelect.bind(this)}
                                multi={false}
                                options={families}
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
)(InventoryFilter as any) as typeof InventoryFilter;