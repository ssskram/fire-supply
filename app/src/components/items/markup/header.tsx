import * as React from 'react'

type props = {
    department: string
}

export default class Header extends React.Component<props, {}>{

    render() {
        return (
            <div style={{ padding: '15px 25px 0px 25px' }}>
                <div style={{ fontSize: '2em'}} className='oswald-header'>Available Inventory</div>
                <div style={{ fontSize: '1.3em'}} className='oswald'>{this.props.department}</div>
                <hr />
            </div>
        )
    }
}