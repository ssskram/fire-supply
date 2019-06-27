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
  items: Array<types.item>; // already filtered by department
  userProfile: types.userProfile;
  user: types.user;
  updateCart: (obj) => void;
};

const imgSize = {
  height: "100px",
  width: "100px",
  padding: "3px"
};

export default function ItemTable(props: props) {
  // base inventory table
  let columns = [
    {
      Header: "",
      accessor: "cartegraphID",
      Cell: props => (
        <AddToCart
          item={props.original}
          user={props.user}
          userProfile={props.userProfile}
          updateCart={() => props.updateCart()}
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
      Header: "Type",
      accessor: "itemType"
    }
  ];

  // department specific inventory fields
  if (props.userProfile.department == "Bureau of Fire") {
    columns.splice(2, 0, {
      Header: "Unit",
      accessor: "itemUnit"
    });
  } else if (props.userProfile.department == "DPW/Parks") {
    columns.splice(
      1,
      0,
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
      }
    );
  }

  return (
    <div className="col-md-12">
      <ReactTable
        data={props.items
          .filter(
            // filter items already in cart
            item =>
              !props.userProfile.cart.some(
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
