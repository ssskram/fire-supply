/*
  Table of inventory items
 */

import * as React from "react";
import * as types from "../../../store/types";
import ReactTable from "react-table";
import AddToCart from "../../addToCart";
import getInventoryImage from "../functions/getInventoryImage";
import "react-table/react-table.css";
import LoadingImage from "../../utilities/loadingImage";
const placeholder = require("../../../images/image-placeholder.png");

type props = {
  items: Array<types.item>;
  userProfile: types.userProfile;
  user: types.user;
  updateCart: (obj) => void;
};

const imgSize = {
  height: "100px",
  width: "100px",
  padding: "3px"
};

export default class ItemTable extends React.Component<props, {}> {
  render() {
    let columns;
    if (this.props.userProfile.department == "Bureau of Fire") {
      columns = [
        {
          Header: "",
          accessor: "cartegraphID",
          Cell: props => (
            <AddToCart
              item={props.original}
              user={this.props.user}
              userProfile={this.props.userProfile}
              updateCart={this.props.updateCart.bind(this)}
            />
          ),
          maxWidth: 125
        },
        {
          Header: "Item",
          accessor: "itemName",
          Cell: props => <b>{props.value}</b>
        },
        {
          Header: "Unit",
          accessor: "itemUnit"
        },
        {
          Header: "Type",
          accessor: "itemType"
        }
      ];
    } else {
      columns = [
        {
          Header: "",
          accessor: "cartegraphID",
          Cell: props => (
            <AddToCart
              item={props.original}
              user={this.props.user}
              userProfile={this.props.userProfile}
              updateCart={this.props.updateCart.bind(this)}
            />
          ),
          maxWidth: 125
        },
        {
          Header: "",
          accessor: "hasImage",
          Cell: props => {
            return props.value == true ? (
              <LoadingImage
                call={() => getInventoryImage(props.original.cartegraphID)}
                style={imgSize}
                oid={props.original.cartegraphID}
              />
            ) : (
              <img src={placeholder} style={imgSize} className="center-block" />
            );
          }
        },
        {
          Header: "ID",
          accessor: "inventoryID"
        },
        {
          Header: "Item",
          accessor: "itemName",
          Cell: props => <b>{props.value}</b>
        },
        {
          Header: "Type",
          accessor: "itemType"
        }
      ];
    }

    return (
      <div className="col-md-12">
        <ReactTable
          data={this.props.items
            .filter(
              item =>
                !this.props.userProfile.cart.some(
                  e => e.item.cartegraphID === item.cartegraphID
                )
            )
            .sort((a, b) => a.itemName.localeCompare(b.itemName))}
          columns={columns}
          loading={false}
          minRows={0}
          pageSize={100}
          showPagination={true}
          showPageSizeOptions={false}
          noDataText=""
          getTdProps={() => ({
            style: {
              padding: "0px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              fontSize: "14px"
            }
          })}
        />
      </div>
    );
  }
}
