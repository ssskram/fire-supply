
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
    department: string
}

// orders
export interface orders {
    orders: order[]
}
export interface order {
    _id: string
    user: string
    department: string
    location: string
    comments: string
    emergencyOrder: boolean
    emergencyJustification: string
    narcanCases: boolean
    narcanAdministeredUnknown: string
    miscItems: string
    items: item[]
}

// message
export interface messsage {
    message: string
}