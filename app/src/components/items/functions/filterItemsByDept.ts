export default function filterItemsByDepartment(items, userProfile) {
  console.log(items);
  if (items.length > 0) {
    const deptItems = items.filter(item => {
      return item.department == userProfile.department;
    });
    return deptItems;
  } else return [];
}
