import * as React from 'react'

export default class NullSearch extends React.Component{

    render() {
        return (
            <div className='col-md-12 text-center'>
            <div className='alert alert-info' >
                <h3>Nothing matches those search terms</h3>
            </div>
        </div>
        )
    }
}