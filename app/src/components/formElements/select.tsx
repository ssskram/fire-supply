import * as React from "react";
import Select from "react-select";

export default class SelectElement extends React.Component<any, any> {
  public render() {
    return (
      <div className="form-group">
        <div className="col-md-12 form-element">
          <h5 className="form-h5">
            {this.props.header}
            {this.props.required == true && (
              <span style={{ color: "red", fontSize: "20" }}>*</span>
            )}
          </h5>
          <Select
            placeholder={this.props.placeholder}
            value={this.props.value}
            onChange={this.props.onChange}
            options={this.props.options}
            closeOnSelect={!this.props.multi}
            simpleValue={this.props.multi}
            removeSelected={this.props.multi}
            multi={this.props.multi}
            clearable={this.props.multi}
            autoFocus={false}
          />
        </div>
      </div>
    );
  }
}
