// hydrates the wholeeeeee store

import * as React from "react";
import { connect } from "react-redux";
import { ApplicationState } from "../../store";
import * as types from "../../store/types";
import * as user from "../../store/user";
import * as items from "../../store/items";
import * as orders from "../../store/orders";
import * as locations from "../../store/deliveryLocations";
import errorHandler from "../../functions/errorHandler";

type props = {
  user: types.user;
  items: types.items;
  locations: types.locations;
  loadItems: () => void;
  loadOrders: () => void;
  loadLocations: () => void;
};

class Hydrate extends React.Component<props, {}> {
  componentDidMount() {
    try {
      this.props.loadItems();
      this.props.loadOrders();
      this.props.loadLocations();
    } catch (err) {
      errorHandler(err);
    }
  }

  public render() {
    console.log(this.props);
    return null;
  }
}

export default connect(
  (state: ApplicationState) => ({
    ...state.user,
    ...state.items,
    ...state.orders,
    ...state.locations
  }),
  {
    ...user.actionCreators,
    ...items.actionCreators,
    ...orders.actionCreators,
    ...locations.actionCreators
  }
)(Hydrate as any);
