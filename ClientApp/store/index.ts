import * as Messages from './messages';
import * as Ping from './ping';
import * as User from './user';
import * as Orders from './orders';
import * as Items from './items';
import * as Cart from './cart';


export interface ApplicationState {
    user: User.UserState;
    ping: Ping.PingState;
    messages: Messages.MessageState;
    orders: Orders.OrdersState;
    items: Items.ItemsState;
    cart: Cart.CartState;

}
export const reducers = {
    user: User.reducer,
    ping: Ping.reducer,
    messages: Messages.reducer,
    orders: Orders.reducer,
    items: Items.reducer,
    card: Cart.reducer
};

export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}
