/*
 * Parent component for admin view
 * Browse & filter all orders
 * Orders open in modal, with fields to update
 */

import * as React from "react";
import HydrateStore from "../utilities/hydrateStore";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { ApplicationState } from "../../store";
import * as types from "../../store/types";
import * as orders from "../../store/orders";
import * as messages from "../../store/messages";
import * as userProfile from "../../store/userProfile";
import Card from "../orders/markup/card";
import NoOrders from "../orders/markup/noOrders";
import ModifyOrder from "./markup/modifyOrder";
import Messages from "../utilities/messages";
import Spinner from "../utilities/spinner";
import FilterButtons from "./markup/filterButtons";
import Search from "./markup/search";
import Header from "../orders/markup/header";
import {
  returnPageNumber,
  returnCurrentItems
} from "../orders/functions/paging";
import Paging from "../utilities/paging";
import ErrorHandler from "../../functions/errorHandler";

type props = {
  orders: types.order[];
  userProfile: types.userProfile;
  updateOrder: (newOrder) => boolean;
  errorMessage: () => void;
  clearMessage: () => void;
};

type state = {
  currentPage: number;
  orders: any[];
  onFilter: boolean;
  filter: string;
  search: string;
  spinner: boolean;
  redirect: boolean;
  modifyOrder: types.order;
};

export class Admin extends React.Component<props, state> {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      orders: props.orders.filter(
        order => order.department == props.userProfile.department
      ),
      onFilter: false,
      filter: "all orders",
      search: "",
      spinner: false,
      redirect: false,
      modifyOrder: undefined
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.checkPermissions(this.props.userProfile);
  }

  componentWillReceiveProps(nextProps, nextState) {
    this.checkPermissions(nextProps.userProfile);
    if (this.state.onFilter == false) {
      this.setState({
        orders: nextProps.orders.filter(
          order => order.department == nextProps.userProfile.department
        )
      });
    }
  }

  checkPermissions(userProfile: types.userProfile) {
    if (userProfile.isAdmin == false) {
      this.setState({ redirect: true });
    }
  }

  componentWillUnmount() {
    this.props.clearMessage();
  }

  setFilter(filter: string) {
    this.setState({ filter, onFilter: true }, () => this.runFilter());
  }

  setSearch(search: string) {
    this.setState({ search, onFilter: true }, () => this.runFilter());
  }

  runFilter() {
    try {
      const filtered = this.props.orders
        .filter(order => order.department == this.props.userProfile.department)
        .filter(order => {
          if (this.state.filter == "emergency orders") {
            if (
              !order.emergencyOrder == true ||
              (order.status == "Rejected" || order.status == "Delivered")
            ) {
              return false;
            }
          }
          if (this.state.filter == "open orders") {
            if (order.status == "Delivered" || order.status == "Rejected") {
              return false;
            }
          }
          if (this.state.search) {
            if (
              !order.location
                .toLowerCase()
                .includes(this.state.search.toLowerCase()) &&
              !order.userName
                .toLowerCase()
                .includes(this.state.search.toLowerCase()) &&
              !order.status
                .toLowerCase()
                .includes(this.state.search.toLowerCase())
            )
              return false;
          }
          return true;
        });
      this.setState({
        orders: filtered
      });
    } catch (err) {
      ErrorHandler(err);
    }
  }

  render() {
    const currentItems = returnCurrentItems(
      this.state.orders,
      this.state.currentPage
    );
    const pageNumbers = returnPageNumber(this.state.orders);
    const renderItems = currentItems.map((order, key) => {
      return (
        <Card
          onClick={order => this.setState({ modifyOrder: order })}
          key={key}
          order={order}
        />
      );
    });

    if (this.state.redirect) {
      return <Redirect push to={"/"} />;
    }

    return (
      <div className="col-md-12">
        <HydrateStore />
        {this.state.spinner == true && <Spinner notice="...saving..." />}
        <Messages />
        <Header text="SUPPLY WAREHOUSE" userProfile={this.props.userProfile} />
        <hr />
        <FilterButtons
          filter={this.state.filter}
          setFilter={this.setFilter.bind(this)}
          allOrders={this.props.orders.filter(
            order => order.department == this.props.userProfile.department
          )}
        />
        <Search
          search={this.state.search}
          filter={this.state.filter}
          setSearch={this.setSearch.bind(this)}
        />
        {this.state.orders.length > 0 && (
          <div className="row">
            {renderItems}
            <br />
            <br />
            <Paging
              count={this.state.orders}
              currentPage={this.state.currentPage}
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
        {this.state.orders.length == 0 && <NoOrders />}
        {this.state.modifyOrder && (
          <ModifyOrder
            setState={this.setState.bind(this)}
            order={this.state.modifyOrder}
            closeView={() =>
              this.setState({ modifyOrder: undefined, spinner: false })
            }
            updateOrder={this.props.updateOrder.bind(this)}
            errorMessage={this.props.errorMessage.bind(this)}
          />
        )}
      </div>
    );
  }
}

export default connect(
  (state: ApplicationState) => ({
    ...state.orders,
    ...state.userProfile,
    ...state.messages
  }),
  {
    ...orders.actionCreators,
    ...userProfile.actionCreators,
    ...messages.actionCreators
  }
)(Admin as any);
