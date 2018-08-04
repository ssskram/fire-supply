import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../../store';
import Select from '../FormElements/select'
import Input from '../FormElements/input'

const marginTop = {
    marginTop: '18px'
}

const families = [
    { value: '', label: 'All', name: 'family' },
    { value: 'House', label: 'House Supplies', name: 'family' },
    { value: 'Office', label: 'Office Supplies', name: 'family' },
    { value: 'Medical', label: 'Medical Supplies', name: 'family' },
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
            viewFormat: 'cards'
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
            family
        } = this.state



        return <div>
            <div className='form-group'>
                <div className='row'>
                    <div className='col-md-5'>
                        <Input
                            value={obj}
                            name="obj"
                            header="Search for an item"
                            placeholder="Enter item name"
                            callback={this.handleChildChange.bind(this)}
                        />
                    </div>
                    <div className='col-md-5'>
                        <Select
                            value={family}
                            name="family"
                            header='Filter by type'
                            placeholder='Select an item type'
                            onChange={this.handleChildSelect.bind(this)}
                            multi={false}
                            options={families}
                        />
                    </div>
                    <div style={marginTop} className='col-md-2 text-center hidden-xs hidden-sm'>
                        <button className='btn btn-secondary' onClick={this.toggleViewFormat.bind(this)}><span className='glyphicon glyphicon-eye-open'></span></button>
                    </div>
                </div>
            </div>
        </div>;
    }
}

export default connect(
    (state: ApplicationState) => ({

    }),
    ({

    })
)(InventoryFilter as any) as typeof InventoryFilter;