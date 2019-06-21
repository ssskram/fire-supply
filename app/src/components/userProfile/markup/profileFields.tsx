
// fields for profile information, currently just department
// on change, triggers setUserProfile() from userProfile store

import * as React from "react";
import { connect } from "react-redux";
import { ApplicationState } from "../../../store";
import * as types from "../../../store/types";
import * as user from "../../../store/user";
import * as userProfile from "../../../store/userProfile";
import Select from "../../formElements/select";
import { Helmet } from "react-helmet";
import ErrorHandler from "../../../functions/errorHandler";

type props = {
  user: types.user;
  setUserProfile: (object) => void;
  updateCart: (newCart) => void;
};

const departments = [
  { value: "Bureau of Fire", label: "Bureau of Fire" },
  { value: "DPW/Parks", label: "DPW/Parks" }
];

const dropdownStyle =
  ".custom-modal { overflow: visible; } .Select-menu-outer { overflow: visible}";

export class SelectDepartment extends React.Component<props, {}> {
  setUserProfile(department) {
    try {
      this.props.setUserProfile({
        user: this.props.user.email,
        department: department,
        cart: []
      });
    } catch (err) {
      ErrorHandler(err);
    }
  }

  render() {
    return (
      <div>
        <Helmet>
          <style>{dropdownStyle}</style>
        </Helmet>
        <Select
          value={null}
          header=""
          placeholder="Select department or bureau"
          onChange={department => this.setUserProfile(department.value)}
          multi={false}
          options={departments}
        />
      </div>
    );
  }
}

export default connect(
  (state: ApplicationState) => ({
    ...state.userProfile,
    ...state.user
  }),
  {
    ...userProfile.actionCreators,
    ...user.actionCreators
  }
)(SelectDepartment as any);
