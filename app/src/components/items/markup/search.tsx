import * as React from 'react'
import Input from '../../formElements/input'

type state = {
    searchTerm: string
}

export default class Search extends React.Component<{}, state>{
    constructor(props) {
        super(props)
        this.state = {
            searchTerm: ''
        }
    }

    render() {
        return (
            <div className='col-md-6'>
                <br />
                <h4><b>Search by item name</b></h4>
                <div className='panel filter-panel text-center'>
                    <div className='panel-body'>
                        <input type='search'
                            className='form-control'
                            value={this.state.searchTerm}
                            placeholder="Enter item name"
                            onChange={e => this.setState({ searchTerm: e.target.value })}>
                        </input>
                    </div>
                </div>
            </div>
        )
    }
}