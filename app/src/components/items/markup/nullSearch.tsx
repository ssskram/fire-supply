import * as React from "react";

export default class NullSearch extends React.Component {
  render() {
    return (
      <div className="col-md-12 text-center">
        <div className="alert">
          <h3>Nothing matches those search criteria</h3>
        </div>
      </div>
    );
  }
}
