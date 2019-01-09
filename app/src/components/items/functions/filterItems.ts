
export default function filterItems(state) {
    const items = state.items.filter(item => {
        if (!item.itemName.toLowerCase().includes(state.searchTerm.toLowerCase()))
            return false
        if (state.selectedTypes.length > 0) {
            if (!state.selectedTypes.toString().includes(item.itemType)) {
                return false
            } else return true
        }
        else return true
    })
    return items
}