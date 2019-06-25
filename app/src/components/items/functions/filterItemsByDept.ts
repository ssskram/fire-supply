/*
  Filters inventory items by user's department
 */

import * as types from "../../../store/types";

export default function filterItemsByDepartment(
  items: Array<types.item>,
  userProfile: types.userProfile
): types.item[] {
  if (items.length > 0) {
    const deptItems = items.filter(item => {
      return item.department == userProfile.department;
    });
    return deptItems;
  } else return [];
}
