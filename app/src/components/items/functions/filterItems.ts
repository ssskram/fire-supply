
export default function filterItems(state) {
    const items = state.items.filter(item => {
        if (!item.name.toLowerCase().includes(state.searchTerm.toLowerCase()))
            return false
        if (state.selectedTypes.length > 0) {
            if (!state.selectedTypes.toString().includes(item.type)) {
                return false
            } else return true
        }
        else return true
    })
    return items
}