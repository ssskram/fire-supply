/*
 * If order contains narcan,
 * returns "true" else false
 */

import * as types from "../../../store/types";

export default function doesOrderContainNarcan(
  items: types.supplyItem[]
): boolean {
  const narcan = items.filter(i => i.item.itemName.includes("Narcan"));
  if (narcan.length == 0) return false;
  else return true;
}
