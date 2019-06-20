/*
 * Increases/decreases item quantity
 * Manages quantity caps
*/

import * as React from "react";
import { connect } from "react-redux";
import { ApplicationState } from "../../store";
import * as types from "../../store/types";
import * as userProfile from "../../store/userProfile";
import * as style from "./style";
import Number from "react-currency-input";
import ErrorHandler from "../../functions/errorHandler";
import ImageLoader from "../utilities/loadingImage";
import getImage from "../items/functions/getInventoryImage";

type props = {
  quantity: number;
  item: types.item;
  type: string;
  userProfile: types.userProfile;
  returnQuantity: (cartItem) => void;
};

type state = {
  limitExceeded: boolean;
  newQuantity: number;
};

const imgSize = {
  height: "100px",
  width: "100px",
  padding: "5px"
};

export class UpdateQuantity extends React.Component<props, state> {
  constructor(props) {
    super(props);
    this.state = {
      limitExceeded: false,
      newQuantity: props.quantity
    };
  }

  handleLimit(value) {
    if (value > 60 && this.props.item.department == "Bureau of Fire") {
      this.setState({
        limitExceeded: true
      });
    } else if (value < 0) {
      this.setState({
        newQuantity: 0
      });
    } else {
      this.setState({
        limitExceeded: false,
        newQuantity: value
      });
    }
  }

  returnQuantity() {
    try {
      const cartItem = {
        item: this.props.item,
        quantity: this.state.newQuantity
      };
      this.props.returnQuantity(cartItem);
    } catch (err) {
      ErrorHandler(err);
    }
  }

  plusOne() {
    this.handleLimit(this.state.newQuantity + 1);
  }

  minusOne() {
    this.handleLimit(this.state.newQuantity - 1);
  }

  render() {
    const { item, type, userProfile } = this.props;
    const { limitExceeded, newQuantity } = this.state;

    return (
      <div className="col-md-12 text-center">
        <h3>{item.itemName}</h3>
        {userProfile.department == "Bureau of Fire" && (
          <h5>Unit: {item.itemUnit}</h5>
        )}
        {userProfile.department == "DPW/Parks" && (
          <h5>Inventory ID: {item.inventoryID}</h5>
        )}
        {limitExceeded && (
          <div className="alert alert-danger">
            Sorry, you can't have that much.
          </div>
        )}
        {item.hasImage == true && (
          <ImageLoader
            call={() => getImage(item.cartegraphID)}
            style={imgSize}
            oid={item.cartegraphID}
          />
        )}
        <div className="row" style={style.inputWidth}>
          <div className="col-xs-3">
            <button onClick={this.minusOne.bind(this)} className="btn grey">
              <span className="glyphicon glyphicon-minus" />
            </button>
          </div>
          <div className="col-xs-6">
            <Number
              type="search"
              value={newQuantity}
              selectAllOnFocus={false}
              autoFocus={false}
              className="form-control"
              precision="0"
              onChangeEvent={(e, m, f) => this.handleLimit(f)}
            />
          </div>
          <div className="col-xs-3">
            <button onClick={this.plusOne.bind(this)} className="btn grey">
              <span className="glyphicon glyphicon-plus" />
            </button>
          </div>
        </div>
        <button
          disabled={newQuantity == 0}
          className="btn btn-success"
          onClick={this.returnQuantity.bind(this)}
        >
          {type}
        </button>
      </div>
    );
  }
}

export default connect(
  (state: ApplicationState) => ({
    ...state.userProfile
  }),
  {
    ...userProfile.actionCreators
  }
)(UpdateQuantity);
