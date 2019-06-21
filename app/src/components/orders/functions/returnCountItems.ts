/*
 * Returns total quantity of items requested in an order
 */

import * as types from "../../../store/types";

export default function countItems(order: types.order) {
  let count = 0;
  order.supplies.forEach(supply => {
    count = count + supply.quantityOrdered;
  });
  return count;
}
