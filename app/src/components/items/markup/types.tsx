import * as React from 'react'
import * as types from '../../../store/types'

type props = {
    itemTypes: Array<string>
}

type state = {
    selectedTypes: Array<string> | []
}

export default class Types extends React.Component<props, state>{
    constructor(props) {
        super(props)
        this.state = {
            selectedTypes: []
        }
    }
    
    render() {
        const buttons = this.props.itemTypes.map((type, key) => {
            return <button key={key} className='btn btn-secondary btn-item'>{type}</button>
        })

        return (
            <div className='col-md-6'>
                <br />
                <h4><b>Filter by item type</b></h4>
                <div className='panel filter-panel text-center'>
                    <div className='panel-body'>
                        {buttons}
                    </div>
                </div>
            </div>
        )
    }
}