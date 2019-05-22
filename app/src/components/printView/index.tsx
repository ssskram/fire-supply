import * as React from "react";
import { connect } from "react-redux";
import { ApplicationState } from "../../store";
import * as orders from "../../store/orders";
import * as types from "../../store/types";
import Spinner from "../utilities/spinner";
import * as moment from "moment";
import * as style from "../orders/style";
import ReactTable from "react-table";
import { narcanContainer, equipmentContainer } from "../cart/style";
import doesOrderContainNarcan from "../cart/functions/doesOrderContainNarcan";
import doesOrderContainEquipment from "../cart/functions/doesOrderContainEquipment";

type props = {
  match: any;
  orders: types.order[];
  loadOrders: () => void;
};

export class PrintView extends React.Component<props, {}> {
  componentDidMount() {
    this.props.loadOrders();
  }
  render() {
    const _id = this.props.match.params.id;
    const order = this.props.orders.find(o => o._id == _id);

    const columns: any = [
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
        Header: "Picked",
        accessor: "item",
        Cell: props => <div />
      }
    ];

    if (!order) {
      return <Spinner notice="...loading order..." />;
    } else {
      if (order.department == "Bureau of Fire") {
        columns.splice(2, 0, {
          Header: "Unit",
          accessor: "item",
          Cell: props => <div>{props.value.itemUnit}</div>
        });
      }

      if (order.department == "DPW/Parks") {
        columns.splice(1, 0, {
          Header: "ID",
          accessor: "item",
          Cell: props => <div>{props.value.inventoryID}</div>
        });
      }
      return (
        <div>
          <div className="text-center">
            <h5 style={style.viewOrderHeader}>{order.department}</h5>
            <h4 className="ubuntu">{order.location}</h4>
            {/* is emergency && PBF order */}
            {order.emergencyOrder && order.department == "Bureau of Fire" && (
              <div
                style={{ marginBottom: "5px" }}
                className="alert alert-danger"
              >
                <b>EMERGENCY ORDER</b>
                <br />
                <i>{order.emergencyJustification}</i>
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
                {moment(order.createdAt).format("MM/DD/YYYY hh:mm A")}
              </span>
            </div>
            <br />
            <div>Submitted by {order.userName}</div>
            <div>{order.user}</div>
            {order.comments && (
              <div>
                <b>Comments: </b>"{order.comments}"
              </div>
            )}
            <div style={{ margin: "10px 0px" }}>
              {order.supplies.length > 0 && (
                <ReactTable
                  data={
                    order.department == "DPW/Parks"
                      ? order.supplies.sort(function(a, b) {
                          if (a.item.inventoryID < b.item.inventoryID) {
                            return -1;
                          }
                          if (a.item.inventoryID < b.item.inventoryID) {
                            return 1;
                          }
                          return 0;
                        })
                      : order.supplies
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
                      fontSize: "14px"
                    }
                  })}
                />
              )}
            </div>
            {/* has misc items && is PBF order */}
            {order.miscItems && order.department == "Bureau of Fire" && (
              <div className="text-center" style={style.otherItems}>
                <b>Misc. items:</b>
                <br />
                {order.miscItems}
              </div>
            )}
            {/* has narcan && is PBF order */}
            {doesOrderContainNarcan(order.supplies) &&
              order.department == "Bureau of Fire" && (
                <div style={narcanContainer} className="text-center">
                  <b>NARCAN</b>
                  <div>
                    <b>In posession of cases: </b>
                    {order.narcanCases.toString()}
                  </div>
                  {order.narcanAdministeredUnknown && (
                    <div>
                      <div>
                        <b>Unknown amount administered:</b>
                      </div>
                      <div>"{order.narcanAdministeredUnknown}"</div>
                    </div>
                  )}
                </div>
              )}
            {/* has equipment && is PBF order */}
            {doesOrderContainEquipment(order.supplies).check &&
              order.department == "Bureau of Fire" && (
                <div style={equipmentContainer} className="text-center">
                  <b>Equipment Justification</b>
                  <div>
                    <div>"{order.equipmentJustification}"</div>
                  </div>
                </div>
              )}
          </div>
        </div>
      );
    }
  }
}

export default connect(
  (state: ApplicationState) => ({
    ...state.orders
  }),
  {
    ...orders.actionCreators
  }
)(PrintView as any);
