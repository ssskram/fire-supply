/*
 * Displays the user's department
 */

import * as React from "react";
import * as types from "../../../store/types";

type props = {
  text: string;
  userProfile: types.userProfile;
};

export default class OrdersHeader extends React.Component<props, {}> {
  render() {
    return (
      <div className="oswald" style={{ marginTop: "20px" }}>
        <div style={{ fontSize: "1.8em" }}>{this.props.text}</div>
        <div style={{ fontSize: "1.3em" }}>
          {this.props.userProfile.department}
        </div>
      </div>
    );
  }
}
