
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
}

// items
export interface items {
    items: item[]
}
export interface item {
    cartegraphID: string
    name: string
    type: string
    department:  string
}

// message
export interface messsage { 
    message: string
}