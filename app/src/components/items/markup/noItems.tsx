import * as React from "react";
import { Cat } from "react-kawaii";
import * as types from "../../../store/types";

type props = {
  userProfile: types.userProfile;
};

export default class NoItems extends React.Component<props, {}> {
  render() {
    return (
      <div className="col-md-12 text-center" style={{ margin: "60px 0px" }}>
        <Cat size={200} mood="sad" color="#AED3E5" />
        <div
          className="alert alert-info"
          style={{ maxWidth: "650px", margin: "0 auto" }}
        >
          <h3>No inventory for the {this.props.userProfile.department}</h3>
        </div>
      </div>
    );
  }
}
