import { fetch, addTask } from 'domain-task'
import { Action, Reducer } from 'redux'
import { AppThunkAction } from '.'

export interface ItemsState {
    items: InventoryItems[]
}

export interface InventoryItems {
    id: any
    family: any
    obj: any
    unit: any
}

interface RequestItemsAction {
    type: 'REQUEST_ITEMS';
}

interface ReceiveItemsAction {
    type: 'RECEIVE_ITEMS'
    items: InventoryItems[]
}

type KnownAction = RequestItemsAction | ReceiveItemsAction;


export const actionCreators = {
    getItems: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        let fetchTask = fetch('/api/items/get', {
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

const unloadedState: ItemsState = { items: [] };

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