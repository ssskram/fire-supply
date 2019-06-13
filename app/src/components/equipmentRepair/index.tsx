import * as React from "react";
import * as types from "../../store/types";
import Form from "./form";
import sendMail from "./post";
import Spinner from "../utilities/spinner";

type state = {
  modal: boolean;
  spinner: boolean;
  location: select;
  make: string;
  model: string;
  serialNumber: string;
  reasonForRepair: string;
};

type props = {
  user: types.user;
  locations: types.location[];
  userProfile: types.userProfile;
  errorMessage: () => void;
  successMessage: () => void;
};

type select = { label: string; value: string };

export default class EquipmentRepair extends React.Component<props, state> {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      spinner: false,
      location: undefined,
      make: "",
      model: "",
      serialNumber: "",
      reasonForRepair: ""
    };
  }

  post() {
    this.setState({ spinner: true }, async () => {
      const load = {
        location: this.state.location.value,
        make: this.state.make,
        model: this.state.model,
        serialNumber: this.state.serialNumber,
        reasonForRepair: this.state.reasonForRepair
      };
      const success = await sendMail(load, this.props.user);
      if (success == true) {
        this.props.successMessage();
        this.setState({ spinner: false, modal: false });
      } else {
        this.props.errorMessage();
        this.setState({ spinner: false, modal: false });
      }
    });
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
            post={this.post.bind(this)}
          />
        )}
        {this.state.spinner && (
          <Spinner notice="...submitting repair request..." />
        )}
      </div>
    );
  }
}
