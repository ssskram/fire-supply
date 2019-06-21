// user
export interface user {
  email: string;
  organization: string;
  name: string;
}

// user profile
export interface userProfile {
  department: "Bureau of Fire" | "DPW/Parks";
  isAdmin: boolean;
  cart: Array<supplyItem>;
}

// inventory
export interface items {
  items: item[];
}
export interface item {
  cartegraphID: number;
  inventoryID: string;
  itemName: string;
  itemType: string;
  itemUnit: string;
  department?: "Bureau of Fire" | "DPW/Parks";
  hasImage?: boolean;
}

// orders
export interface orders {
  orders: order[];
}
export interface order {
  _id?: string;
  user: string;
  userName: string;
  department: "Bureau of Fire" | "DPW/Parks";
  location: string;
  comments: string;
  emergencyOrder: boolean;
  emergencyJustification: string;
  cartegraphId?: string;
  narcanCases: boolean;
  narcanAdministeredUnknown: string;
  equipmentJustification: string;
  miscItems: string;
  supplies: supplyItem[];
  status: orderStatus;
  supplyComments?: string;
  receivedBy?: string;
  createdAt?: Date;
  _v?: number;
}
export interface supplyItem {
  _id?: string;
  item: item;
  quantity?: number;
  quantityOrdered?: number;
  quantityReceived?: number;
}

// order status
export type orderStatus =
  | "Order Submitted"
  | "Approved"
  | "Partially Approved"
  | "Pending Higher Approval"
  | "Partially Delivered"
  | "Backordered"
  | "Delivered"
  | "Rejected";

// delivery locations
export interface locations {
  locations: location[];
}
export interface location {
  location: string;
  department: "Bureau of Fire" | "DPW/Parks";
}

// message
export interface messsage {
  message: string;
}
