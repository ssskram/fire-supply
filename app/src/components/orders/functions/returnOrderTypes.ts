export default function orderTypes(order) {
    let types = []
    order.supplies.forEach(supply => {
        types.push(supply.item.itemType)
    })
    // take unique
    return types.filter((v, i, a) => a.indexOf(v) === i).join(", ")
}
