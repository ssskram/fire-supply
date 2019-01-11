
// user
export interface user {
    email: string
    organization: string
    name: string
}

// user profile
export interface userProfile {
    department: string
    isAdmin: boolean
    cart: Array<cartItem>
}
export interface cartItem {
    _id: string
    item: item
    quantity: number
}

// items
export interface items {
    items: item[]
}
export interface item {
    cartegraphID: string
    itemName: string
    itemType: string
    itemUnit: string
    department?: string
}

// orders
export interface orders {
    orders: order[]
}
export interface order {
    _id: string
    user: string
    userName: string
    department: string
    location: string
    comments: string
    emergencyOrder: boolean
    emergencyJustification: string
    narcanCases: boolean
    narcanAdministeredUnknown: string
    miscItems: string
    supplies: supplyItem[]
    status: string
    supplyComments: string
    receivedBy: string
    createdAt: string
    _v: number
}
export interface supplyItem {
    _id: string
    item: item
    quantityOrdered: number
    quantityReceived: number
}

// message
export interface messsage {
    message: string
}