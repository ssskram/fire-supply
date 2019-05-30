import * as React from "react";

type state = {
  modal: boolean;
};

export default class EquipmentRepair extends React.Component<{}, state> {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
  }
  
  render() {
    return (
      <div className="col-md-6">
        <div
          className="alert alert-info text-center"
          style={{ fontSize: "1.3em" }}
        >
          <div>Need something repaired?</div>
          <div
            className="oswald text-button"
            onClick={() => this.setState({ modal: true })}
          >
            Click here
          </div>
        </div>
      </div>
    );
  }
}
