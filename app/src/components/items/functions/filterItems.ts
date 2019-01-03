
export default function filterItems(state) {
    const items = state.items.filter(item => {
        if (!item.name.toLowerCase().includes(state.searchTerm.toLowerCase()))
            return false
        if (!state.selectedTypes.includes(item.type))
            return false
        else return true
    })
    return items
}