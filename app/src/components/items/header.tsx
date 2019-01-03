import * as React from 'react'

type props = {
    department: string
}

export default class Header extends React.Component<props, {}>{

    render() {
        return (
            <div className='text-center'>
                <h2>Available inventory</h2>
                <h4>{this.props.department}</h4>
            </div>
        )
    }
}