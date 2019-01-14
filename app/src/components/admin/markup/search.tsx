import * as React from 'react'
import Input from '../../formElements/input'

export default class Search extends React.Component<any, any> {

    render() {
        const placeholder = "Search " + this.props.filter
        return <div className='col-md-12'>
            <Input
                value={this.props.search}
                header=""
                placeholder={placeholder}
                callback={(e) => this.props.setState({ search: e.target.value })}
            />
        </div>
    }
}