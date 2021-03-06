/*
 * Admin order view
 * Includes all order information, and fields for updating order
 */

import * as React from "react";
import { Link } from "react-router-dom";
import Modal from "react-responsive-modal";
import * as types from "../../../store/types";
import * as style from "../../orders/style";
import * as moment from "moment";
import ReactTable from "react-table";
import { narcanContainer, equipmentContainer } from "../../cart/style";
import doesOrderContainNarcan from "../../cart/functions/doesOrderContainNarcan";
import doesOrderContainEquipment from "../../cart/functions/doesOrderContainEquipment";
import Fields from "./fields";
import ErrorHandler from "../../../functions/errorHandler";

type props = {
  order: types.order;
  closeView: () => void;
  updateOrder: (newOrder) => boolean;
  errorMessage: () => void;
  setState: (obj) => void;
};

type state = types.order;

export default class ModifyOrder extends React.Component<props, state> {
  constructor(props) {
    super(props);
    // gross, I know
    // but it's the easiest way to reuse form components
    this.state = {
      _id: props.order._id,
      user: props.order.user,
      userName: props.order.userName,
      department: props.order.department,
      location: props.order.location,
      comments: props.order.comments,
      emergencyOrder: props.order.emergencyOrder,
      emergencyJustification: props.order.emergencyJustification,
      cartegraphId: props.order.cartegraphId,
      narcanCases: props.order.narcanCases,
      narcanAdministeredUnknown: props.order.narcanAdministeredUnknown,
      equipmentJustification: props.order.equipmentJustification,
      miscItems: props.order.miscItems,
      supplies: props.order.supplies,
      status: props.order.status,
      supplyComments: props.order.supplyComments,
      receivedBy: props.order.receivedBy,
      createdAt: props.order.createdAt,
      _v: props.order._v
    };
  }

  updateSupplies(qtyReceived: number, itemID: string): void {
    try {
      const suppliesCopy = this.state.supplies;
      const itemIndex = suppliesCopy.findIndex(sp => sp._id == itemID);
      suppliesCopy[itemIndex].quantityReceived = qtyReceived;
      this.setState({ supplies: suppliesCopy });
    } catch (err) {
      ErrorHandler(err);
    }
  }

  async saveOrder(): Promise<void> {
    try {
      this.props.setState({ spinner: true });
      const success = await this.props.updateOrder(this.state);
      if (success == true) this.props.closeView();
      else {
        this.props.errorMessage();
        this.props.closeView();
      }
    } catch (err) {
      ErrorHandler(err);
    }
  }

  render() {
    const {
      _id,
      createdAt,
      userName,
      user,
      comments,
      department,
      location,
      emergencyOrder,
      emergencyJustification,
      miscItems,
      narcanCases,
      narcanAdministeredUnknown,
      equipmentJustification,
      supplies
    } = this.state;

    const columns: Array<any> = [
      {
        Header: "Item",
        accessor: "item",
        Cell: props => <b>{props.value.itemName}</b>
      },
      {
        Header: "Type",
        accessor: "item",
        Cell: props => <div>{props.value.itemType}</div>
      },
      {
        Header: "Ordered",
        accessor: "quantityOrdered"
      },
      {
        Header: "Received",
        accessor: "quantityReceived",
        Cell: props => (
          <div>
            <input
              type="number"
              className="form-control"
              style={{ fontWeight: "bold", color: "#a94442" }}
              value={props.original.quantityReceived}
              onChange={e =>
                this.updateSupplies(
                  e.target.value as undefined, // input => number, gotta call it undefined
                  props.original._id as string
                )
              }
            />
          </div>
        )
      }
    ];

    // we're displaying the units for the inventory items, PBF
    if (this.props.order.department == "Bureau of Fire") {
      columns.splice(2, 0, {
        Header: "Unit",
        accessor: "item",
        Cell: props => <div>{props.value.itemUnit}</div>
      });
    }

    // we're displaying the cart ID for DPW items
    if (this.props.order.department == "DPW/Parks") {
      columns.splice(1, 0, {
        Header: "ID",
        accessor: "item",
        Cell: props => <div>{props.value.inventoryID}</div>
      });
    }

    return (
      <Modal
        open={true}
        onClose={() => this.props.closeView()}
        classNames={{
          overlay: "custom-overlay",
          modal: "custom-modal"
        }}
        showCloseIcon={true}
        center
      >
        <div>
          <div className="text-center">
            <h5 style={style.viewOrderHeader}>{department}</h5>
            <h4 className="ubuntu">{location}</h4>
            {/* is emergency && PBF order */}
            {emergencyOrder && this.props.order.department == "Bureau of Fire" && (
              <div
                style={{ marginBottom: "5px" }}
                className="alert alert-danger"
              >
                <b>EMERGENCY ORDER</b>
                <br />
                <i>{emergencyJustification}</i>
              </div>
            )}
            <hr />
          </div>
          <div>
            <h4 className="text-center oswald">ORDER DETAILS</h4>
            <div>
              <span className="pull-left">
                {_id && <div>Order #{_id.substr(_id.length - 6)}</div>}
              </span>
              <span className="pull-right">
                {moment(createdAt).format("MM/DD/YYYY hh:mm A")}
              </span>
            </div>
            <br />
            <div>Submitted by {userName}</div>
            <a href={"mailto:" + user}>{user}</a>
            {comments && (
              <div>
                <b>Comments: </b>"{comments}"
              </div>
            )}
            <div style={{ margin: "10px 0px" }}>
              {supplies.length > 0 && (
                <ReactTable
                  data={
                    // different sorts for different department
                    // DPW wants their shit sorted by cart ID
                    this.props.order.department == "DPW/Parks"
                      ? supplies.sort(function(a, b) {
                          if (a.item.inventoryID < b.item.inventoryID) {
                            return -1;
                          }
                          if (a.item.inventoryID < b.item.inventoryID) {
                            return 1;
                          }
                          return 0;
                        })
                      : supplies
                  }
                  columns={columns}
                  loading={false}
                  minRows={0}
                  showPagination={false}
                  showPageSizeOptions={false}
                  defaultPageSize={500}
                  noDataText=""
                  getTdProps={() => ({
                    style: {
                      padding: "5px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      fontSize: "12px"
                    }
                  })}
                />
              )}
            </div>
            {/* has misc items && is PBF order */}
            {miscItems && this.props.order.department == "Bureau of Fire" && (
              <div className="text-center" style={style.otherItems}>
                <b>Misc. items:</b>
                <br />
                {miscItems}
              </div>
            )}
            {/* has narcan && is PBF order */}
            {doesOrderContainNarcan(supplies) &&
              this.props.order.department == "Bureau of Fire" && (
                <div style={narcanContainer} className="text-center">
                  <b>NARCAN</b>
                  <div>
                    <b>In posession of cases: </b>
                    {narcanCases.toString()}
                  </div>
                  {narcanAdministeredUnknown && (
                    <div>
                      <div>
                        <b>Unknown amount administered:</b>
                      </div>
                      <div>"{narcanAdministeredUnknown}"</div>
                    </div>
                  )}
                </div>
              )}
            {/* has equipment && is PBF order */}
            {doesOrderContainEquipment(supplies).check &&
              this.props.order.department == "Bureau of Fire" && (
                <div style={equipmentContainer} className="text-center">
                  <b>Equipment Justification</b>
                  <div>
                    <div>"{equipmentJustification}"</div>
                  </div>
                </div>
              )}
          </div>
          <hr />
          <h4 className="text-center oswald">SUPPLY FEEDBACK</h4>
          <Fields state={this.state} setState={this.setState.bind(this)} />
          <div className="col-md-12 text-center">
            <button
              onClick={this.saveOrder.bind(this)}
              className="btn btn-success"
            >
              Save
            </button>
            {/* Link to print view if _id has been returned from Mongo */}
            {_id && (
              <Link to={"Print/id=" + _id}>
                <button
                  onClick={this.saveOrder.bind(this)}
                  className="btn btn-primary"
                >
                  Print View
                </button>
              </Link>
            )}
          </div>
        </div>
      </Modal>
    );
  }
}
