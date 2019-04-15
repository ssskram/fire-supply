import * as React from "react";

const placeholder = require("./../../images/image-placeholder.png");

export default class LoadingImage extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      imagePath: placeholder
    };
  }

  onLoad() {
    this.setState({
      imagePath: this.props.src
    });
  }

  public render() {
    const { imagePath } = this.state;

    return (
      <div>
        <img
          style={this.props.style}
          className="center-block"
          src={imagePath}
        />
        <div className="hidden">
          <img
            src={this.props.src}
            style={this.props.style}
            onLoad={this.onLoad.bind(this)}
            className="center-block"
          />
        </div>
      </div>
    );
  }
}

// props https://hackernoon.com/improve-your-ux-by-dynamically-rendering-images-via-react-onload-393fd4d0d946
