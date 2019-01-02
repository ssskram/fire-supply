import * as React from 'react'
import Select from './select'

export default class SetProfile extends React.Component {

    render() {
        return (
            <div className='text-center'>
                <h2>Welcome to PGH Supply</h2>
                <h4>To get started, select your department or bureau:</h4>
                <Select />
            </div>
        )
    }
}