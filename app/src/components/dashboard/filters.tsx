import * as React from 'react'
import Select from '../formElements/select'
import * as types from '../../store/types'
import * as hs from '../cart/markup/selects'

type props = {
    state: any
    items: types.item[]
    setState: (obj) => void
}

export default class Filters extends React.Component<props, {}> {

    render() {
        let itemDropdowns = [] as any
        this.props.items.forEach(item => {
            if (item.itemType != 'Medicine' && item.itemType != 'Equipment') {
                const select = { value: item.itemName, label: item.itemName }
                itemDropdowns.push(select)
            }
        })

        const isEnabled = 
            this.props.state.recipient ||
            this.props.state.item != "Toilet Paper"

        return (
            <div className='row' style={{marginBottom: '15px'}}>
                <div className='col-md-5'>
                    <Select
                        value={{ value: this.props.state.item, label: this.props.state.item }}
                        header=''
                        placeholder='Change inventory item'
                        onChange={item => this.props.setState({ item: item.value })}
                        multi={false}
                        options={itemDropdowns}
                    />
                </div>
                <div className='col-md-5'>
                    <Select
                        value={this.props.state.recipient ? { value: this.props.state.recipient, label: this.props.state.recipient } : ''}
                        header=''
                        placeholder='Filter by recipient'
                        onChange={recipient => this.props.setState({ recipient: recipient.value })}
                        multi={false}
                        options={hs.FireHouses}
                    />
                </div>
                <div className='col-md-2 text-center'>
                    <button disabled={!isEnabled} className='btn btn-warning' onClick={() => this.props.setState({ item: 'Toilet Paper', recipient: undefined })} style={{ width: '90%' }}>Clear</button>
                </div>
            </div>
        )
    }
}