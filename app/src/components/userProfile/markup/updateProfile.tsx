import * as React from 'react'
import Select from './select'

export default class UpdateProfile extends React.Component {

    render() {
        return (
            <div className='text-center'>
                <h3>Select your department or bureau</h3>
                <Select />
            </div>
        )
    }
}