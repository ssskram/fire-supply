import { fetch, addTask } from 'domain-task';
import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';

export interface ItemsState {
    items: number;
}

interface RequestItemsAction {
    type: 'REQUEST_ITEMS';
}

interface ReceiveItemsAction {
    type: 'RECEIVE_ITEMS';
    items: number;
}

type KnownAction = RequestItemsAction | ReceiveItemsAction;


export const actionCreators = {
    items: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        let fetchTask = fetch('/api/items/pong', {
            credentials: 'same-origin',
            headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8'
            }
        })
            .then(response => response.json())
            .then(data => {
                dispatch({ type: 'RECEIVE_ITEMS', items: data });
                if (data == 0) {
                    window.location.reload();
                }
            });

        addTask(fetchTask);
        dispatch({ type: 'REQUEST_ITEMS' });
    },
};

const unloadedState: ItemsState = { items: 1 };

export const reducer: Reducer<ItemsState> = (state: ItemsState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_ITEMS':
            return {
                items: state.items,
            };
        case 'RECEIVE_ITEMS':
            return {
                items: action.items,
            };
        default:
            const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
};