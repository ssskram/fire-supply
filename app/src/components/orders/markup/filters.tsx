/*
 * Filers for all orders view
 * filter by recipient or by status
 */

import * as React from "react";
import Select from "react-select";
import * as st from "../../admin/markup/statuses";
import * as types from "../../../store/types";
import ErrorHandler from "../../../functions/errorHandler";

type props = {
  orders: types.order[];
  locations: types.location[];
  filter: (obj) => void;
};

type state = {
  location: any;
  status: any;
};

export default class Filters extends React.Component<props, state> {
  constructor(props) {
    super(props);
    this.state = {
      location: undefined,
      status: undefined
    };
  }

  filter() {
    try {
      const filtered = this.props.orders.filter(order => {
        if (this.state.location) {
          if (!order.location.includes(this.state.location.value)) {
            return false;
          }
        }
        if (this.state.status) {
          if (!order.status.includes(this.state.status.value)) {
            return false;
          }
        }
        return true;
      });
      this.props.filter(filtered);
    } catch (err) {
      ErrorHandler(err);
    }
  }

  clearFilter() {
    this.setState({
      location: "",
      status: ""
    });
    this.props.filter(this.props.orders);
  }

  render() {
    const { location, status } = this.state;
    const isEnabled = location || status;
    let locations = [];
    this.props.locations.forEach(l => {
      locations.push({ value: l.location, label: l.location });
    });

    return (
      <div className="row" style={{ marginBottom: "10px" }}>
        <div className="col-md-5" style={{ margin: "5px 0px" }}>
          <Select
            value={location}
            header=""
            placeholder="Filter by recipient"
            onChange={location =>
              this.setState({ location }, () => this.filter())
            }
            multi={false}
            options={locations}
          />
        </div>
        <div className="col-md-5" style={{ margin: "5px 0px" }}>
          <Select
            value={status}
            header=""
            placeholder="Filter by status"
            onChange={status => this.setState({ status }, () => this.filter())}
            multi={false}
            options={st.orderStatuses}
          />
        </div>
        <div className="col-md-2 text-center" style={{ margin: "5px 0px" }}>
          <button
            disabled={!isEnabled}
            className="btn btn-warning"
            onClick={this.clearFilter.bind(this)}
            style={{ width: "90%", margin: "0px", padding: "7px" }}
          >
            Clear
          </button>
        </div>
      </div>
    );
  }
}
