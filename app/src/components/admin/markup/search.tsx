import * as React from "react";
import Input from "../../formElements/input";

type props = {
  search: string;
  filter: string;
  setSearch: (search: string) => void;
};

export default class Search extends React.Component<props, {}> {
  render() {
    const placeholder = "Search " + this.props.filter;
    return (
      <div className="col-md-12">
        <Input
          value={this.props.search}
          header=""
          placeholder={placeholder}
          callback={e => this.props.setSearch(e.target.value)}
        />
      </div>
    );
  }
}
