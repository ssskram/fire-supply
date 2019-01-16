import randomcolor from 'randomcolor'

export default function colorArray(orders) {
    let allLocations = [] as any
    let uniqueLocations = [] as any
    let colors = [] as any
    orders.forEach(order => allLocations.push(order.location))
    uniqueLocations = allLocations.filter((v, i, a) => a.indexOf(v) === i)
    uniqueLocations.forEach(location => {
        const colorObj = {
            location: location,
            color: randomcolor()
        }
        colors.push(colorObj)
    })
    return colors
}