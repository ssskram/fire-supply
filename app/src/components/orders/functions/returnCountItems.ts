export default function countItems(order) {
  let count = 0;
  order.supplies.forEach(supply => {
    count = count + supply.quantityOrdered;
  });
  return count;
}
