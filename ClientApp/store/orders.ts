import { fetch } from 'domain-task';

const loadOrders = 'load'

const unloadedState: OrdersState = {
    orders: []
}

export interface OrdersState {
    orders: OrderItems[]
}

export interface OrderItems {
    id: string
    submitted: string
    cartGenerated: string
    orderSubmitted: string
    user: string
    house: string
    comments: string
    emergency: string
    emergencyJustification: string
    narcanCases: string
    narcanExplanation: string
    supplyComments: string
    lastModified: string
    status: string
    items: CartItems[]
}

export interface CartItems {
    obj: string
    family: string
    unit: string
    quantityOrdered: string
    quantityReceived: string
}

export const actionCreators = {
    loadOrders: () => (dispatch) => {
        fetch('/api/orders/all', {
            credentials: 'same-origin',
            headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8'
            }
        })
            .then(response => response.json())
            .then(data => {
                dispatch({ type: loadOrders, orders: data });
            });
    },
};

export const reducer = (state: OrdersState, action) => {
    switch (action.type) {
        case loadOrders:
            return {
                ...state,
                orders: action.orders,
            };
    }

    return state || unloadedState;
};