import * as React from 'react'
import * as types from '../../store/types'
import { XYPlot, XAxis, YAxis, VerticalGridLines, VerticalBarSeries, Hint, HorizontalGridLines } from 'react-vis'
import * as moment from 'moment'
import Spinner from '../utilities/spinner'
import NoOrders from '../orders/markup/noOrders'
import colorArray from './colorArray'
import ViewOrder from '../orders/markup/viewOrder'

type props = {
    item: string
    recipient: string
    items: types.item[]
    orders: types.order[]
}

type state = {
    data: any[]
    colors: any[]
    hoverHouse: string
    selectedOrder: types.order
    countXTicks: number
    plotWidth: number
}

export default class ScatterPlot extends React.Component<props, state> {
    private ref: React.RefObject<HTMLHeadingElement>
    constructor(props) {
        super(props)
        this.state = {
            data: undefined,
            colors: undefined,
            hoverHouse: undefined,
            selectedOrder: undefined,
            plotWidth: 0,
            countXTicks: 0
        }
        this.ref = React.createRef()
    }

    componentDidMount() {
        if (this.props.orders) {
            this.setState({
                colors: colorArray(this.props.orders),
            }, () => this.setData(this.props.orders))
        }
        this.setPlot()
        window.addEventListener("resize", this.setPlot.bind(this))
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.orders) {
            this.setState({
                colors: colorArray(nextProps.orders),
            }, () => this.setData(nextProps.orders))
        }
    }

    setData(orders) {
        let dataArr: any = orders.map((o) => {
            const color = this.state.colors.find(color => color.location == o.location)
            if (o.supplies.some(i => i.item.itemName == this.props.item)) {
                return {
                    x: moment(o.createdAt).format('MM/DD/YYYY'),
                    y: o.supplies.find(i => i.item.itemName == this.props.item).quantityOrdered,
                    h: o.location,
                    color: color.color,
                    order: o
                }
            } else {
                return {
                    x: moment(o.createdAt).format('MM/DD/YYYY'),
                    y: 0,
                    h: o.location,
                    color: color.color,
                    order: o
                }
            }
        })

        if (this.props.recipient) {
            dataArr = dataArr.map(o => {
                if (o.h == this.props.recipient) {
                    return {
                        x: o.x,
                        y: o.y,
                        h: o.y,
                        color: o.color,
                        order: o.order
                    }
                } else {
                    return {
                        x: o.x,
                        y: 0,
                        h: o.y,
                        color: o.color,
                        order: o.order
                    }
                }
            })
        }
        dataArr.sort((a, b) => new Date(a.x).getTime() - new Date(b.x).getTime())
        this.setState({ data: dataArr })
    }

    setPlot() {
        if (this.ref.current) {
            this.setState({
                plotWidth: this.ref.current.offsetWidth,
                countXTicks: this.countTicks()
            })
        }
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

    hoverColor(house) {
        let indexes = [] as any
        this.state.data.forEach((point, index) => {
            if (point.order) {
                if (point.order.location == house) indexes.push(index)
            }
        })
        let dataCopy = this.state.data
        indexes.forEach(i => {
            dataCopy[i].color = 'black'
        })
        this.setState({ data: dataCopy, hoverHouse: house })
    }

    returnColor(house) {
        let indexes = [] as any
        this.state.data.forEach((point, index) => {
            if (point.order) {
                if (point.order.location == house) indexes.push(index)
            }
        })
        let dataCopy = this.state.data
        const colorRecord = this.state.colors.find(color => color.location == house)
        indexes.forEach(i => {
            dataCopy[i].color = colorRecord.color
        })
        this.setState({ data: dataCopy, hoverHouse: undefined })
    }

    render() {

        const yTitle = "Units ordered (" + this.getUnit() + ")"

        return (
            <div className='panel'>
                <div ref={this.ref} className='panel-body'>
                    {this.state.hoverHouse &&
                        <div className='chartHoverLabel'>{this.state.hoverHouse}</div>
                    }
                    {this.state.data &&
                        <div>
                            {this.state.data.length == 0 && this.props.orders.length == 0 &&
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
                                    tickValues={this.state.data.filter((item, idx) => {
                                        if ((idx % Math.floor(this.state.data.length / this.state.countXTicks)) === 0) {
                                            return item.x
                                        } else return null
                                    }).map(item => moment((item.x)).format('MM/DD/YYYY'))}
                                    tickLabelAngle={-60}
                                    tickSizeInner={200}
                                />
                                <YAxis title={yTitle} />
                                <VerticalBarSeries
                                    colorType="literal"
                                    data={this.state.data}
                                    barWidth={2}
                                    onValueClick={(dp, event) => {
                                        this.setState({ selectedOrder: dp.order })
                                    }}
                                    onValueMouseOver={(dp, event) => {
                                        this.hoverColor(dp.h)
                                    }}
                                    onValueMouseOut={(dp, event) => {
                                        this.returnColor(dp.h)
                                    }}
                                />
                            </XYPlot>
                            {this.state.data.length == 0 && this.props.orders.length != 0 &&
                                <Spinner notice="...loading order history..." />
                            }
                            {this.state.selectedOrder &&
                                <ViewOrder
                                    order={this.state.selectedOrder}
                                    closeView={() => this.setState({ selectedOrder: undefined })}
                                />}
                        </div>
                    }
                    {!this.state.data &&
                        <Spinner notice="...loading order history..." />
                    }
                </div>
            </div>
        )
    }
}