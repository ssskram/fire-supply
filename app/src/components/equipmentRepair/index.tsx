import * as React from "react";
import * as types from "../../store/types";
import Form from "./form";

type state = {
  modal: boolean;
  location: select;
  make: string;
  model: string;
  serialNumber: string;
  reasonForRepair: string;
};

type props = {
  locations: types.location[];
  userProfile: types.userProfile;
};

type select = { label: string; value: string };

export default class EquipmentRepair extends React.Component<props, state> {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      location: undefined,
      make: "",
      model: "",
      serialNumber: "",
      reasonForRepair: ""
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
        {this.state.modal && (
          <Form
            setState={this.setState.bind(this)}
            locations={this.props.locations}
            userProfile={this.props.userProfile}
            location={this.state.location}
            make={this.state.make}
            model={this.state.model}
            serialNumber={this.state.serialNumber}
            reasonForRepair={this.state.reasonForRepair}
          />
        )}
      </div>
    );
  }
}
