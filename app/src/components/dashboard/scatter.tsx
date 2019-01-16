import * as React from 'react'
import * as types from '../../store/types'
import { XYPlot, XAxis, YAxis, VerticalGridLines, HeatmapSeries, HorizontalGridLines } from 'react-vis'
import * as moment from 'moment'

type props = {
    orders: types.order[]
}

export default class ScatterPlot extends React.Component<props, {}> {

    render() {
        const supplies = this.props.orders.filter(order => order.supplies[0])
        const dataArr = supplies.map((o) => {
            return {
                x: moment(o.createdAt).format('MM/DD/YYYY'),
                y: o.supplies[0].quantityOrdered
            }
        })
        return (
            <div>
                <XYPlot
                    xType="ordinal"
                    width={1000}
                    height={500}>
                    <VerticalGridLines />
                    <HorizontalGridLines />
                    <XAxis
                        tickValues={
                            (dataArr.length > 15)
                                ? dataArr
                                    .filter((item, idx) => {
                                        if ((idx % Math.floor(dataArr.length / 5)) === 0) {
                                            return item.x
                                        } else return null
                                    }).map(item => (item.x))
                                : dataArr.map(item => (item.x))
                        }
                        tickLabelAngle={-80}
                    />
                    <YAxis title="Number of pull requests (thousands)" />
                    <HeatmapSeries
                        data={dataArr} />
                </XYPlot>
            </div>
        )
    }
}