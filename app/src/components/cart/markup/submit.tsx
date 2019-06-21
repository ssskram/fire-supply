/*
 * Submits order, collects return status, communicates it out
 */

import * as React from "react";
import { Redirect } from "react-router-dom";
import ErrorHandler from "../../../functions/errorHandler";

type props = {
  isEnabled: boolean;
  submitIt: () => boolean;
  successMessage: () => void;
  errorMessage: () => void;
  closeForm: () => void;
};

type state = {
  redirect: boolean;
};

export default class Submit extends React.Component<props, state> {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    };
  }

  // awaits on the post function
  // success? true/false
  // throw messages and redirect as necessary
  async submitIt(): Promise<void> {
    try {
      const success = await this.props.submitIt();
      if (success == true) {
        this.props.successMessage();
        this.setState({ redirect: true });
      } else {
        this.props.errorMessage();
        this.props.closeForm();
      }
    } catch (err) {
      ErrorHandler(err);
    }
  }

  render() {
    return (
      <div className="text-center">
        <button
          disabled={!this.props.isEnabled}
          onClick={this.submitIt.bind(this)}
          className="btn btn-success"
        >
          Submit
        </button>
        {this.state.redirect && <Redirect push to={"MyOrders"} />}
      </div>
    );
  }
}
