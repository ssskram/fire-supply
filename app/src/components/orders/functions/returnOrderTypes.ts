/*
 * Returns the different inventory types included in an order
 */

import * as types from "../../../store/types";

export default function orderTypes(order: types.order) {
  let types = [];
  order.supplies.forEach(supply => {
    types.push(supply.item.itemType);
  });
  // take unique as string array
  return types.filter((v, i, a) => a.indexOf(v) === i).join(", ") as string;
}
