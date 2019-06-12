export default function doesOrderContainNarcan(items) {
  const narcan = items.filter(item => item.item.itemName.includes("Narcan"));
  if (narcan.length == 0) return false;
  else return true;
}
