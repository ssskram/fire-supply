export default function doesOrderContainEquipment(items) {
    const equipment = items.filter(item => item.item.itemType.includes('Equipment'))
    if (equipment.length == 0) return false
    else return true
}