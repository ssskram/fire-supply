/*
 * Form for order submission
 * A lot of conditionals here whether:
 * Deparment is PBF or DPW, as well as
 * Order is a full order, or a quick misc item (for PBF)
 *
 * If  order is a  "full"  order then props.formType == "Complete",
 * else it is a "OneOff" order, where a single misc item is being requested,
 * and no cart items exist
 */

import * as React from "react";
import * as types from "../../../store/types";
import TextArea from "../../formElements/textarea";
import Select from "../../formElements/select";
import Modal from "react-responsive-modal";
import * as selects from "../selects";
import SubmitIt from "./submit";
import * as style from "../style";
import doesOrderContainNarcan from "../functions/doesOrderContainNarcan";
import doesOrderContainEquipment from "../functions/doesOrderContainEquipment";
import { Helmet } from "react-helmet";
import Spinner from "../../utilities/spinner";

type props = {
  user: types.user;
  userProfile: types.userProfile;
  locations: types.location[];
  updateCart: (newProfile) => void;
  closeForm: () => void;
  newOrder: (newOrder) => boolean;
  errorMessage: () => void;
  successMessage: () => void;
  formType: "Complete" | "OneOff";
};

type state = {
  location: select;
  miscItems: string;
  comments: string;
  emergencyOrder: boolSelect;
  emergencyJustification: string;
  narcanCases: boolSelect;
  narcanAdministeredUnknown: string;
  equipmentJustification: string;
};

type boolSelect = { label: string; value: boolean };
type select = { label: string; value: string };

const dropdownStyle =
  ".custom-modal { overflow: visible; } .Select-menu-outer { overflow: visible}";

export default class FormFields extends React.Component<props, state> {
  constructor(props) {
    super(props);
    this.state = {
      location: undefined,
      miscItems: "",
      comments: "",
      emergencyOrder: undefined,
      emergencyJustification: "",
      narcanCases: undefined,
      narcanAdministeredUnknown: "",
      equipmentJustification: ""
    };
  }

  // builds order object
  // passses order to store
  // then empties the cart
  // returns true/false if everything is gravy
  async placeOrder(): Promise<boolean> {
    let items = [] as Array<types.supplyItem>;
    if (this.props.formType == "Complete") {
      this.props.userProfile.cart.forEach(c => {
        const orderItem = {
          item: {
            cartegraphID: c.item.cartegraphID,
            inventoryID: c.item.inventoryID,
            itemName: c.item.itemName,
            itemType: c.item.itemType,
            itemUnit: c.item.itemUnit
          },
          quantityOrdered: c.quantity
        };
        items.push(orderItem);
      });
    }
    const newOrder: types.order = {
      user: this.props.user.email,
      userName: this.props.user.name,
      department: this.props.userProfile.department,
      location: this.state.location ? this.state.location.value : undefined,
      comments: this.state.comments,
      emergencyOrder: this.state.emergencyOrder
        ? this.state.emergencyOrder.value
        : undefined,
      emergencyJustification: this.state.emergencyJustification,
      narcanCases: this.state.narcanCases
        ? this.state.narcanCases.value
        : undefined,
      narcanAdministeredUnknown: this.state.narcanAdministeredUnknown,
      equipmentJustification: this.state.equipmentJustification,
      miscItems: this.state.miscItems,
      status: "Order Submitted",
      supplies: items
    };
    const success = await this.props.newOrder(newOrder);
    if (success == true) {
      this.props.updateCart({
        user: this.props.user.email,
        cart: []
      });
    }
    return success;
  }

  // field validation
  validSubmission(equipment, narcan, formType: "Complete" | "OneOff"): boolean {
    // collection form errors here
    let it = 0;
    if (this.state.location == undefined) {
      // WRONG
      it++;
    }
    if (this.props.userProfile.department == "Bureau of Fire") {
      if (
        formType == "Complete" &&
        equipment.check &&
        !this.state.equipmentJustification
      ) {
        // WRONG
        it++;
      }
      if (formType == "Complete" && narcan && !this.state.narcanCases) {
        // WRONG
        it++;
      }
      if (this.state.emergencyOrder == undefined) {
        // WRONG
        it++;
      }
      if (
        this.state.emergencyOrder &&
        this.state.emergencyOrder.value &&
        !this.state.emergencyJustification
      ) {
        // WRONG
        it++;
      }
      if (formType == "OneOff" && this.state.miscItems == "") {
        // WRONG
        it++;
      }
    }
    // no form errors?
    return it == 0;
  }

  render() {
    const {
      location,
      miscItems,
      comments,
      emergencyOrder,
      emergencyJustification,
      narcanCases,
      narcanAdministeredUnknown,
      equipmentJustification
    } = this.state;

    const containsEquipment = doesOrderContainEquipment(
      this.props.userProfile.cart
    );
    const containsNarcan = doesOrderContainNarcan(this.props.userProfile.cart);
    const isEnabled = this.validSubmission(
      containsEquipment,
      containsNarcan,
      this.props.formType
    );

    let locations = [] as Array<select>;
    this.props.locations.forEach(location => {
      if (location.department == this.props.userProfile.department) {
        const select = { value: location.location, label: location.location };
        locations.push(select);
      }
    });

    return (
      <Modal
        open={true}
        onClose={() => this.props.closeForm()}
        classNames={{
          overlay: "custom-overlay",
          modal: "custom-modal"
        }}
        showCloseIcon={true}
        center
      >
        <div className="col-md-12">
          {this.props.userProfile.department != "Bureau of Fire" && (
            <Helmet>
              <style>{dropdownStyle}</style>
            </Helmet>
          )}
          <h3 className="text-center oswald">
            {this.props.formType == "Complete"
              ? "Complete your order"
              : "Miscellaneous Item"}
          </h3>
          {this.props.formType == "OneOff" && (
            <div
              style={{
                fontSize: ".8em",
                maxWidth: "400px",
                margin: "10px 0px"
              }}
              className="text-center"
            >
              Note: If you currently have items in your cart, requesting a
              miscellaneous item will empty your cart. Please proceed with
              submitting your cart, and you will be able to add a miscellaneous
              item at that point.
            </div>
          )}
          <Select
            value={location}
            header="Select location for delivery"
            placeholder="Select location"
            onChange={location => this.setState({ location })}
            multi={false}
            options={locations}
            required
          />
          {this.props.userProfile.department == "Bureau of Fire" && (
            <div>
              <TextArea
                value={miscItems}
                header={
                  this.props.formType == "Complete"
                    ? "Do you need anything else?"
                    : "What do you need?"
                }
                placeholder="Couldn't find what you were looking for?"
                callback={e => this.setState({ miscItems: e.target.value })}
              />
              <div
                className="col-md-12"
                style={
                  emergencyOrder && emergencyOrder.value
                    ? style.emergencyColor
                    : style.emergencyContainer
                }
              >
                <Select
                  value={emergencyOrder}
                  header="Is this an emergency?"
                  placeholder="Yes or no"
                  onChange={emergencyOrder => this.setState({ emergencyOrder })}
                  multi={false}
                  options={selects.YesNo}
                  required
                />
                {emergencyOrder && emergencyOrder.value && (
                  <TextArea
                    value={emergencyJustification}
                    header="Emergency Justification"
                    placeholder="Please explain why this is an emergency"
                    callback={e =>
                      this.setState({ emergencyJustification: e.target.value })
                    }
                    required
                  />
                )}
              </div>
              {containsNarcan && this.props.formType == "Complete" && (
                <div className="col-md-12" style={style.narcanContainer}>
                  <h5 className="text-center">
                    <b>NARCAN</b>
                  </h5>
                  <Select
                    value={narcanCases}
                    header="Do you have the cases?"
                    placeholder="Yes or no"
                    onChange={narcanCases => this.setState({ narcanCases })}
                    multi={false}
                    options={selects.YesNo}
                    required
                  />
                  <TextArea
                    value={narcanAdministeredUnknown}
                    header="If amount administered is unknown, please explain why"
                    placeholder="Explanation"
                    callback={e =>
                      this.setState({
                        narcanAdministeredUnknown: e.target.value
                      })
                    }
                  />
                </div>
              )}
              {containsEquipment.check && this.props.formType == "Complete" && (
                <div className="col-md-12" style={style.equipmentContainer}>
                  <h5 className="text-center">
                    <b>JUSTIFY EQUIPMENT</b>
                  </h5>
                  <TextArea
                    value={equipmentJustification}
                    header=""
                    placeholder={"Justify " + containsEquipment.items}
                    callback={e =>
                      this.setState({ equipmentJustification: e.target.value })
                    }
                  />
                </div>
              )}
              <TextArea
                value={comments}
                header="Additional comments"
                placeholder="Anything else we need to know?"
                callback={e => this.setState({ comments: e.target.value })}
              />
            </div>
          )}
          <SubmitIt
            isEnabled={isEnabled}
            submitIt={this.placeOrder.bind(this)}
            closeForm={() => this.props.closeForm()}
            successMessage={this.props.successMessage.bind(this)}
            errorMessage={this.props.errorMessage.bind(this)}
          />
        </div>
        {this.props.locations.length == 0 && (
          <Spinner notice="...loading delivery locations..." />
        )}
      </Modal>
    );
  }
}
