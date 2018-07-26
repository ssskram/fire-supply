import { fetch, addTask } from 'domain-task';
import { Action, Reducer } from 'redux';
import { AppThunkAction } from '.';

export interface OrdersState {
    orders: number;
}

interface RequestOrdersAction {
    type: 'REQUEST_ORDERS';
}

interface ReceiveOrdersAction {
    type: 'RECEIVE_ORDERS';
    orders: number;
}

type KnownAction = RequestOrdersAction | ReceiveOrdersAction;


export const actionCreators = {
    orders: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        let fetchTask = fetch('/api/orders/all', {
            credentials: 'same-origin',
            headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8'
            }
        })
            .then(response => response.json())
            .then(data => {
                dispatch({ type: 'RECEIVE_ORDERS', orders: data });
                if (data == 0) {
                    window.location.reload();
                }
            });

        addTask(fetchTask);
        dispatch({ type: 'REQUEST_ORDERS' });
    },
};

const unloadedState: OrdersState = { orders: 1 };

export const reducer: Reducer<OrdersState> = (state: OrdersState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_ORDERS':
            return {
                orders: state.orders,
            };
        case 'RECEIVE_ORDERS':
            return {
                orders: action.orders,
            };
        default:
            const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
};