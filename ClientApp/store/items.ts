import { fetch, addTask } from 'domain-task'

const requestItems = 'request'
const receiveItems = 'receive'

export interface ItemsState {
    items: InventoryItems[]
}

export interface InventoryItems {
    id: any
    family: any
    obj: any
    unit: any
}

export const actionCreators = {
    getItems: () => (dispatch) => {
        let fetchTask = fetch('/api/items/get', {
            credentials: 'same-origin',
            headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8'
            }
        })
            .then(response => response.json())
            .then(data => {
                dispatch({ type: receiveItems, items: data });
                if (data == 0) {
                    window.location.reload();
                }
            });

        addTask(fetchTask);
        dispatch({ type: requestItems });
    },
};

const unloadedState: ItemsState = { items: [] };

export const reducer = (state: ItemsState, action) => {
    switch (action.type) {
        case requestItems:
            return {
                items: state.items,
            };
        case receiveItems:
            return {
                items: action.items,
            };
    }

    return state || unloadedState;
};