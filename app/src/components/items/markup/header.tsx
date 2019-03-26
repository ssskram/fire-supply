import * as React from 'react'

type props = {
    department: string
}

export default class Header extends React.Component<props, {}>{

    render() {
        return (
            <div className='text-center' style={{ margin: '20px 0px' }}>
                <div style={{ fontSize: '2em' }} className='oswald'>Available Inventory</div>
                <div style={{ fontSize: '1.3em' }} className='oswald'>{this.props.department}</div>
            </div>
        )
    }
}