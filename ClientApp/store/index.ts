import * as Messages from './messages'
import * as Ping from './ping'
import * as User from './user'
import * as Orders from './orders'
import * as Items from './items'
import * as Cart from './cart'
import * as Houses from './houses'


export interface ApplicationState {
    user: User.UserState
    ping: Ping.PingState
    messages: Messages.MessageState
    orders: Orders.OrdersState
    items: Items.ItemsState
    cart: Cart.CartState
    cartID: Cart.ID
    houses: Houses.HousesState

}
export const reducers = {
    user: User.reducer,
    ping: Ping.reducer,
    messages: Messages.reducer,
    orders: Orders.reducer,
    items: Items.reducer,
    cart: Cart.reducer,
    houses: Houses.reducer
};

export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}
