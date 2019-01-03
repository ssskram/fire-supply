import * as React from 'react'
import * as types from '../../../store/types'

type props = {
    selectedTypes: Array<string> | []
    itemTypes: Array<string>
    receiveFilter: (type: string, load: string) => void
}

export default class Types extends React.Component<props, {}>{

    
    render() {
        const buttons = this.props.itemTypes.map((type, key) => {
            return <button key={key} onClick={() => this.props.receiveFilter("selectedTypes", type)} className='btn btn-secondary btn-item'>{type}</button>
        })

        return (
            <div className='col-md-6'>
                <br />
                <h4>Filter by item type</h4>
                <div className='panel filter-panel text-center'>
                    <div className='panel-body'>
                        {buttons}
                    </div>
                </div>
            </div>
        )
    }
}