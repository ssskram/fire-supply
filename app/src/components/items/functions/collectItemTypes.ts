export default function collectItemTypes(items) {
  if (items.length > 0) {
    const types = items
      .map(item => item.itemType)
      .filter((value, index, self) => self.indexOf(value) === index);
    return types.sort();
  } else return [];
}
