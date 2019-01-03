import * as React from 'react'

const clicked = {
    backgroundColor: 'black',
}

const unclicked = {
    backgroundColor: 'grey',
}

type props = {
    selectedTypes: Array<any> | []
    itemTypes: Array<string>
    receiveFilter: (type: string, load: string) => void
}

export default class Types extends React.Component<props, {}>{

    render() {
        const buttons = this.props.itemTypes.map((type, key) => {
            return (
                <button
                    key={key}
                    onClick={() => this.props.receiveFilter("selectedTypes", type)}
                    style={(this.props.selectedTypes.toString().includes(type)) ? clicked : unclicked}
                    className='btn btn-secondary btn-item'>
                    {type}
                </button>
            )
        })

        return (
            <div className='col-md-6'>
                <br />
                <div className='panel filter-panel text-center'>
                    <div className='panel-body'>
                        {buttons}
                    </div>
                </div>
            </div>
        )
    }
}