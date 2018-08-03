import { fetch, addTask } from 'domain-task';

const requestOrders = 'request'
const receiveOrders = 'receive'
const add = 'add'

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
        let fetchTask = fetch('/api/orders/all', {
            credentials: 'same-origin',
            headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8'
            }
        })
            .then(response => response.json())
            .then(data => {
                dispatch({ type: receiveOrders, orders: data });
            });
        addTask(fetchTask);
        dispatch({ type: requestOrders });
    },
};

const unloadedState: OrdersState = {
    orders: []
}

export const reducer = (state: OrdersState, action) => {
    switch (action.type) {
        case requestOrders:
            return {
                orders: state.orders,
            };
        case receiveOrders:
            return {
                orders: action.orders,
            };
    }

    return state || unloadedState;
};