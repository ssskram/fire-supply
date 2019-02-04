import * as React from 'react'
import HydrateStore from '../utilities/hydrateStore'
import Items from '../items'

export default class Home extends React.Component<any, any> {

    render() {
        return (
            <div>
                <div className='alert alert-danger'>
                    <b>Notice:</b> This site is not live, and contains only a snapshot of existing orders.  Currently, any orders placed through this site will not be filled.  Currently, this site is only configured for demo purposes and testing.
                </div>
                <HydrateStore />
                <Items />
            </div>
        )
    }
}