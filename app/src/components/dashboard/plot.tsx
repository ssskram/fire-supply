import * as React from 'react'
import * as types from '../../store/types'
import { XYPlot, XAxis, YAxis, VerticalGridLines, VerticalBarSeries, HorizontalGridLines } from 'react-vis'
import * as moment from 'moment'
import Spinner from '../utilities/spinner'
import NoOrders from '../orders/markup/noOrders'

type props = {
    item: string
    recipient: string
    items: types.item[]
    orders: types.order[]
}

type state = {
    countXTicks: number
    plotWidth: number
}

export default class ScatterPlot extends React.Component<props, state> {
    private ref: React.RefObject<HTMLHeadingElement>
    constructor(props) {
        super(props)
        this.state = {
            plotWidth: 0,
            countXTicks: 0
        }
        this.ref = React.createRef()
    }

    componentDidMount() {
        this.setPlot()
        window.addEventListener("resize", this.setPlot.bind(this))
    }

    setPlot() {
        this.setState({
            plotWidth: this.ref.current.offsetWidth,
            countXTicks: this.countTicks()
        })
    }

    countTicks() {
        if (this.ref.current.offsetWidth > 1000) return 15
        if (this.ref.current.offsetWidth > 800) return 10
        else return 5
    }

    getUnit() {
        const item = this.props.items.find(item => item.itemName == this.props.item)
        if (item) return item.itemUnit
        else return "each"
    }

    render() {
        let dataArr: any = this.props.orders.map((o) => {
            if (o.supplies.some(i => i.item.itemName == this.props.item)) {
                return {
                    x: moment(o.createdAt).format('MM/DD/YYYY'),
                    y: o.supplies.find(i => i.item.itemName == this.props.item).quantityOrdered,
                    h: o.location
                }
            } else {
                return {
                    x: moment(o.createdAt).format('MM/DD/YYYY'),
                    y: 0,
                    h: o.location
                }
            }
        })

        if (this.props.recipient) {
            dataArr = dataArr.map(o => {
                if (o.h == this.props.recipient) {
                    return {
                        x: o.x,
                        y: o.y,
                        h: o.y
                    }
                } else {
                    return {
                        x: o.x,
                        y: 0,
                        h: o.y
                    }
                }
            })
        }

        dataArr.sort((a, b) => new Date(a.x).getTime() - new Date(b.x).getTime())

        const yTitle = "Units ordered (" + this.getUnit() + ")"

        return (
            <div className='panel'>
                <div ref={this.ref} className='panel-body'>
                    {dataArr.length == 0 && this.props.orders.length == 0 &&
                        <NoOrders />
                    }
                    <XYPlot
                        xType="ordinal"
                        width={this.state.plotWidth}
                        height={500}
                        margin={{ bottom: 90, left: 70, right: 50 }}>
                        <VerticalGridLines />
                        <HorizontalGridLines />
                        <XAxis
                            tickValues={dataArr.filter((item, idx) => {
                                if ((idx % Math.floor(dataArr.length / this.state.countXTicks)) === 0) {
                                    return item.x
                                } else return null
                            }).map(item => moment((item.x)).format('MM/DD/YYYY'))}
                            tickLabelAngle={-60}
                            tickSizeInner={200}
                        />
                        <YAxis title={yTitle} />
                        <VerticalBarSeries
                            data={dataArr}
                            color='rgb(44, 62, 80)' />
                    </XYPlot>
                </div>
                {dataArr.length == 0 && this.props.orders.length != 0 &&
                    <Spinner notice="...loading order history..." />
                }
            </div>
        )
    }
}