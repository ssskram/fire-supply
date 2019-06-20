/*
  Input for search, inventory items
 */

import * as React from "react";

type props = {
  searchTerm: string;
  receiveFilter: (type: "selectedTypes" | "searchTerm", load: string) => void;
};

export default class Search extends React.Component<props, {}> {
  render() {
    return (
      <div className="col-md-12">
        <div className="panel filter-panel text-center">
          <div className="panel-body">
            <input
              type="search"
              className="form-control"
              value={this.props.searchTerm}
              placeholder="Search for item"
              onChange={e =>
                this.props.receiveFilter("searchTerm", e.target.value)
              }
            />
          </div>
        </div>
      </div>
    );
  }
}
