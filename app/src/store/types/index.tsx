
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
    department:  string
}

// message
export interface messsage { 
    message: string
}