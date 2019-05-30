import * as React from "react";
import * as types from "../../store/types";
import Form from "../cart/markup/fields";

type state = {
  modal: boolean;
};

type props = {
  user: types.user;
  userProfile: types.userProfile;
  locations: types.location[];
  updateCart: (newProfile) => void;
  newOrder: (newOrder) => boolean;
  errorMessage: () => void;
  successMessage: () => void;
};

export default class MiscItem extends React.Component<props, state> {
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
          className="alert alert-danger text-center"
          style={{ fontSize: "1.3em" }}
        >
          <div>Can't find what you're looking for?</div>
          <div
            className="oswald text-button"
            onClick={() => this.setState({ modal: true })}
          >
            Click here
          </div>
        </div>
        {this.state.modal && (
          <Form
            closeForm={() => this.setState({ modal: false })}
            user={this.props.user}
            userProfile={this.props.userProfile}
            locations={this.props.locations}
            updateCart={this.props.updateCart.bind(this)}
            newOrder={this.props.newOrder.bind(this)}
            successMessage={this.props.successMessage.bind(this)}
            errorMessage={this.props.errorMessage.bind(this)}
            formType="OneOff"
          />
        )}
      </div>
    );
  }
}
