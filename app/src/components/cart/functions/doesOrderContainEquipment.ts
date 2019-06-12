export default function doesOrderContainEquipment(items) {
  const equipment = items.filter(item =>
    item.item.itemType.includes("Equipment")
  );
  const equipmentString = equipment.map(item => item.item.itemName).toString();
  if (equipment.length == 0) return { check: false, items: undefined };
  else return { check: true, items: equipmentString };
}
