import * as React from 'react'

export default class UserAccount extends React.Component<any, any> {

    public render() {
        return <div>
            <h3><b>This is your department</b></h3>
            <div style={{ marginTop: '20px' }}>
                <h4>All inventory and orders you see within this site will be filtered through your department.</h4>
                <h5><i>Note: switching your department will empty your cart of all current items</i></h5>
            </div>
        </div>
    }
}