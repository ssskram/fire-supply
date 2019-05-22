import * as React from "react";
import { connect } from "react-redux";
import { ApplicationState } from "../../store";
import * as orders from "../../store/orders";
import * as types from "../../store/types";
import Spinner from "../utilities/spinner";

type props = {
  match: any;
  orders: types.order[];
  loadOrders: () => void;
};

export class PrintView extends React.Component<props, {}> {
  componentDidMount() {
    this.props.loadOrders();
  }
  render() {
    const _id = this.props.match.params.id;
    const order = this.props.orders.find(o => o._id == _id);
    if (!order) {
      return <Spinner notice="...loading order..." />;
    } else {
      console.log(order);
      return <div>Print view here</div>;
    }
  }
}

export default connect(
  (state: ApplicationState) => ({
    ...state.orders
  }),
  {
    ...orders.actionCreators
  }
)(PrintView as any);
