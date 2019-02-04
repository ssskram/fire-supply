import * as React from 'react'
const box = require('../../../images/inventory.png')

type props = {
    department: string
}

export default class Header extends React.Component<props, {}>{

    render() {
        return (
            <div style={{ padding: '15px 25px 0px 25px' }}>
                <h2>Available Inventory<span className='pull-right hidden-xs'><img src={box as string} /></span></h2>
                <hr />
                <h3><b>{this.props.department}</b></h3>
            </div>
        )
    }
}