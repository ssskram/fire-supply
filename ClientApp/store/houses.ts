import { fetch, addTask } from 'domain-task';
import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';

export interface HousesState {
    houses: Houses[]
}

export interface Houses {
    name: any;
}

interface RequestHousesAction {
    type: 'REQUEST_HOUSES';
}

interface ReceiveHousesAction {
    type: 'RECEIVE_HOUSES';
    houses: Houses[];
}

type KnownAction = RequestHousesAction | ReceiveHousesAction;


export const actionCreators = {
    loadHouses: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        let fetchTask = fetch('/api/houses/get', {
            credentials: 'same-origin',
            headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8'
            }
        })
            .then(response => response.json() as Promise<Houses[]>)
            .then(data => {
                dispatch({ type: 'RECEIVE_HOUSES', houses: data });
            });

        addTask(fetchTask);
        dispatch({ type: 'REQUEST_HOUSES' });
    }
};

const unloadedState: HousesState = { houses: [] };

export const reducer: Reducer<HousesState> = (state: HousesState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_HOUSES':
            return {
                houses: state.houses,
            };
        case 'RECEIVE_HOUSES':
            return {
                houses: action.houses,
            };
        default:
            const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
};
