export default function filterItems(state) {
  const items = state.items.filter(item => {
    if (
      !item.itemName.toLowerCase().includes(state.searchTerm.toLowerCase()) &&
      !item.inventoryID.toLowerCase().includes(state.searchTerm.toLowerCase())
    )
      return false;
    if (state.selectedType != "") {
      if (!state.selectedType.includes(item.itemType)) {
        return false;
      } else return true;
    } else return true;
  });
  return items;
}
