import * as React from "react";
import Select from "./profileFields";

export default class SetProfile extends React.Component {
  render() {
    return (
      <div className="text-center">
        <h2 className="ubuntu">Welcome to PGH Supply</h2>
        <h4>First, select your department or bureau</h4>
        <Select />
      </div>
    );
  }
}
