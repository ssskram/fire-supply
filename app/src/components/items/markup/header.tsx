import * as React from 'react'

type props = {
    department: string
}

export default class Header extends React.Component<props, {}>{

    render() {
        return (
            <div className='text-center'>
                <h2>Available Inventory</h2>
                <h3><b>{this.props.department}</b></h3>
            </div>
        )
    }
}