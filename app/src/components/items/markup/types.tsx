/*
  Buttons enumerate item types per inventory collection
  On selection, inventory is filtered according to type selected
 */

import * as React from "react";

const clicked = {
  backgroundColor: "black"
};

const unclicked = {
  backgroundColor: "grey"
};

type props = {
  selectedType: string;
  itemTypes: Array<string>;
  receiveFilter: (type: "selectedTypes" | "searchTerm", load: string) => void;
};

export default class Types extends React.Component<props, {}> {
  render() {
    const buttons = this.props.itemTypes.map((type, key) => {
      return (
        <button
          key={key}
          onClick={() => this.props.receiveFilter("selectedTypes", type)}
          style={this.props.selectedType == type ? clicked : unclicked}
          className="btn btn-secondary btn-item"
        >
          {type}
        </button>
      );
    });

    return (
      <div className="col-md-12">
        <div className="panel filter-panel text-center">
          <div className="panel-body">{buttons}</div>
        </div>
      </div>
    );
  }
}
