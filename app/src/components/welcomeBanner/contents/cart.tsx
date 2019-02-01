import * as React from 'react'

export default class Cart extends React.Component<any, any> {

    public render() {
        return <div>
            <h3><b>This is your cart</b></h3>
            <div style={{ marginTop: '20px' }}>
                <h4>Fill it and submit it in one sitting, or return later to pull the trigger.  It'll be waiting for you.</h4>
            </div>
        </div>
    }
}