import * as user from "./user";
import * as types from "./types";
import * as messages from "./messages";
import * as userProfile from "./userProfile";
import * as items from "./items";
import * as orders from "./orders";
import * as locations from "./deliveryLocations";

export interface ApplicationState {
  user: types.user;
  messages: types.messsage;
  userProfile: types.userProfile;
  items: types.items;
  orders: types.orders;
  locations: types.locations;
}

export const reducers = {
  user: user.reducer,
  messages: messages.reducer,
  userProfile: userProfile.reducer,
  items: items.reducer,
  orders: orders.reducer,
  locations: locations.reducer
};

export interface AppThunkAction<TAction> {
  (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}
