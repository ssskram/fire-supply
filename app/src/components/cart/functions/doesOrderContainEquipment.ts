/*
 * If order contains heavy equipment,
 * returns "true" and equipment items as string array
 */

import * as types from "../../../store/types";

export default function doesOrderContainEquipment(
  collection: types.supplyItem[]
): { check: boolean; items: string } {
  // filter out equipment items
  const equipment = collection.filter(i =>
    i.item.itemType.includes("Equipment")
  );
  // concat equipment items into string array
  const equipmentString = equipment.map(item => item.item.itemName).toString();
  if (equipment.length == 0) return { check: false, items: undefined };
  else return { check: true, items: equipmentString };
}
