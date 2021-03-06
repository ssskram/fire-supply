/*
 * Fields for admin editing of order
 */

import * as React from "react";
import TextArea from "../../formElements/textarea";
import Select from "../../formElements/select";
import * as types from "../../../store/types";
import Input from "../../formElements/input";
import * as selects from "./statuses";

type props = {
  state: types.order;
  setState: (state: object) => void;
};

export default class SupplyFields extends React.Component<props, {}> {
  render() {
    return (
      <div>
        <Select
          value={{
            value: this.props.state.status,
            label: this.props.state.status
          }}
          header="Status"
          placeholder="Order status"
          onChange={status => this.props.setState({ status: status.value })}
          multi={false}
          options={selects.orderStatuses}
        />
        {/*
         * Only DPW cares about the Cartegraph Oid
         * because only DPW is also managing orders in Cartegraph
         */}
        {this.props.state.department == "DPW/Parks" && (
          <Input
            value={this.props.state.cartegraphId}
            header="Cartegraph ID"
            placeholder="Not visible to users"
            callback={e =>
              this.props.setState({ cartegraphId: e.target.value })
            }
          />
        )}
        <TextArea
          value={this.props.state.supplyComments}
          header="Comments"
          placeholder="Visible to user as 'Supply Comments'"
          callback={e =>
            this.props.setState({ supplyComments: e.target.value })
          }
        />
        {this.props.state.status == "Delivered" && (
          <Input
            value={this.props.state.receivedBy}
            header="Order received by"
            placeholder={
              // Delivered orders are tracking by "Assignment number" for PBF
              this.props.state.department == "Bureau of Fire"
                ? "Assignment number"
                : "Name"
            }
            callback={e => this.props.setState({ receivedBy: e.target.value })}
          />
        )}
      </div>
    );
  }
}
