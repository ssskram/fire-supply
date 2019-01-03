import * as React from 'react'
import * as types from '../../../store/types'

type props = {
    items: Array<types.item>
}

export default class ItemCards extends React.Component<props, {}>{

    render() {
        const itemCards = this.props.items.map((item, key) => {
            return (
                <div className="col-lg-4 col-md-6 col-sm-12" key={key}>
                    <div className="panel">
                        <div className="panel-body text-center">
                            <h4>{item.name}</h4>
                            <h5><b>{item.type}</b></h5>
                            <button className='btn btn-success'><span className='glyphicon glyphicon-plus'></span></button>
                        </div>
                    </div>
                </div>
            )
        })

        return (
            <div className='row'>
                {itemCards}
            </div>
        )
    }
}