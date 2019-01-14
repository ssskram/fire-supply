import * as React from 'react'
import * as types from '../../../store/types'
import * as moment from 'moment'
import countItems from '../functions/returnCountItems'
import orderTypes from '../functions/returnOrderTypes'
import * as style from '../style'
import colorByStatus from '../functions/colorByStatus'

type props = {
    order: types.order
    onClick: (order: types.order) => void
}

type state = {
    innerWidth: number
}

export default class Orders extends React.Component<props, state> {
    constructor(props) {
        super(props)
        this.state = {
            innerWidth: undefined
        }
    }

    componentDidMount() {
        this.setState({ innerWidth: window.innerWidth })
        window.addEventListener("resize", () => this.setState({ innerWidth: window.innerWidth }))
    }

    render() {
        const { order, onClick } = this.props
        const { innerWidth } = this.state
        let lastSix
        if (order._id) { lastSix = order._id.substr(order._id.length - 6) }
        else { lastSix = '...loading' }
        return (
            <div className='col-md-12 text-center'>
                <div className='panel panel-button' style={{ borderColor: colorByStatus(order.status) }} onClick={() => onClick(order)}>
                    <div className='panel-body' style={style.panelBody}>
                        <div className='col-md-3' style={style.paddingTen}>
                            {order.emergencyOrder &&
                                <div style={style.Emergency}><b className='emergency'>EMERGENCY</b></div>
                            }
                            <div>{moment(order.createdAt).format('MM/DD/YYYY hh:mm A')}</div>
                            <div>{order.userName}</div>
                        </div>
                        <div className='col-md-3' style={style.paddingTen}>
                            <div style={style.biggerFont}><b>{order.location}</b></div>
                            <div>{countItems(order)} Items</div>
                            <div><i>{orderTypes(order)}</i></div>
                        </div>
                        <div className={innerWidth < 990 ? 'col-md-4 col-md-offset-2 funny-panel-small' : 'col-md-4 col-md-offset-2 funny-panel-big'} style={{ backgroundColor: colorByStatus(order.status) }}>
                            <div style={{ alignSelf: 'center' }}>
                                <div>Order #{lastSix}</div>
                                <div style={style.smallerFont}>Status</div>
                                <div style={style.biggerFont}><b>{order.status}</b></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}