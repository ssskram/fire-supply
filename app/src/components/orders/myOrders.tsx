import * as React from "react";
import HydrateStore from "../utilities/hydrateStore";
import { connect } from "react-redux";
import { ApplicationState } from "../../store";
import * as types from "../../store/types";
import * as orders from "../../store/orders";
import * as messages from "../../store/messages";
import * as user from "../../store/user";
import * as userProfile from "../../store/userProfile";
import Card from "./markup/card";
import NoOrders from "./markup/noOrders";
import ViewOrder from "./markup/viewOrder";
import Filters from "./markup/filters";
import Header from "./markup/header";
import { returnPageNumber, returnCurrentItems } from "./functions/paging";
import Paging from "../utilities/paging";
import Messages from "../utilities/messages";

type props = {
  orders: types.order[];
  user: types.user;
  userProfile: types.userProfile;
  clearMessage: () => void;
};

type state = {
  currentPage: number;
  myOrders: types.order[];
  viewOrder: types.order;
  onFilter: boolean;
};

export class MyOrders extends React.Component<props, state> {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      myOrders: props.orders.filter(order => {
        return (
          order.user == props.user.email &&
          order.department == props.userProfile.department
        );
      }),
      viewOrder: undefined,
      onFilter: false
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  componentWillUnmount() {
    this.props.clearMessage();
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.onFilter == false) {
      this.setState({
        myOrders: nextProps.orders.filter(order => {
          return (
            order.user == nextProps.user.email &&
            order.department == nextProps.userProfile.department
          );
        })
      });
    }
  }

  filter(filteredOrders) {
    this.setState({
      myOrders: filteredOrders,
      onFilter: true
    });
  }

  render() {
    const { myOrders, currentPage } = this.state;

    const currentItems = returnCurrentItems(myOrders, currentPage);
    const pageNumbers = returnPageNumber(myOrders);
    const renderItems = currentItems.map((order, key) => {
      return (
        <Card
          onClick={order => this.setState({ viewOrder: order })}
          key={key}
          order={order}
        />
      );
    });

    return (
      <div className="col-md-12">
        <Header text="MY ORDERS" userProfile={this.props.userProfile} />
        <hr />
        <HydrateStore />
        <Messages />
        <Filters
          orders={this.props.orders.filter(order => {
            return (
              order.user == this.props.user.email &&
              order.department == this.props.userProfile.department
            );
          })}
          filter={this.filter.bind(this)}
        />
        {myOrders.length > 0 && (
          <div className="row">
            {renderItems}
            <br />
            <br />
            <Paging
              count={myOrders}
              currentPage={currentPage}
              totalPages={pageNumbers}
              next={() => {
                window.scrollTo(0, 0);
                this.setState({ currentPage: this.state.currentPage + 1 });
              }}
              prev={() => {
                window.scrollTo(0, 0);
                this.setState({ currentPage: this.state.currentPage - 1 });
              }}
            />
            <br />
            <br />
          </div>
        )}
        {myOrders.length == 0 && <NoOrders />}
        {this.state.viewOrder && (
          <ViewOrder
            order={this.state.viewOrder}
            closeView={() => this.setState({ viewOrder: undefined })}
          />
        )}
      </div>
    );
  }
}

export default connect(
  (state: ApplicationState) => ({
    ...state.orders,
    ...state.user,
    ...state.userProfile,
    ...state.messages
  }),
  {
    ...orders.actionCreators,
    ...user.actionCreators,
    ...userProfile.actionCreators,
    ...messages.actionCreators
  }
)(MyOrders as any);
