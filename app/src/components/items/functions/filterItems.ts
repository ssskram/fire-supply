/*
  Passed a state object that includes an array of inventory items and a search term
  Filters, and returns
 */

import * as types from "../../../store/types";

type state = {
  items: Array<types.item> | undefined;
  itemTypes: Array<string>;
  selectedType: string;
  searchTerm: string;
  nullSearch: boolean;
};

export default function filterItems(state: state) {
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
