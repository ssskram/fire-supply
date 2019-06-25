/*
  Passed an array of inventory items,
  Returns the unique itemTypes of the array
 */

import * as types from "../../../store/types";

export default function collectItemTypes(items: types.item[]): Array<any> {
  if (items.length > 0) {
    const types = items
      .map(item => item.itemType)
      .filter((value, index, self) => self.indexOf(value) === index);
    return types.sort();
  } else return [];
}
