
export default function filterItems(state) {
    console.log(state)
    const items = state.items.filter(item => {
        if (!item.name.toLowerCase().includes(state.searchTerm.toLowerCase())) return false
        else return true
    })
    console.log(items)
    return items
}