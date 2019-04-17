import * as React from "react";

const placeholder = require("./../../images/image-placeholder.png");

type props = {
  call: () => void;
  style: object;
  oid: number;
};

type state = {
  imagePath: string;
};

export default class LoadingImage extends React.Component<props, state> {
  mounted = false;
  constructor(props) {
    super(props);
    this.state = {
      imagePath: placeholder
    };
  }

  componentDidMount() {
    this.mounted = true;
    this.setImage(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.oid != this.props.oid) {
      this.setState({
        imagePath: placeholder
      });
    }
    if (this.mounted) {
      this.setImage(nextProps);
    }
  }

  async setImage(props) {
    const response = await props.call();
    this.setState({
      imagePath: response
    });
  }

  componentWillUnmount() {
    this.mounted = false;
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
      </div>
    );
  }
}

// props https://hackernoon.com/improve-your-ux-by-dynamically-rendering-images-via-react-onload-393fd4d0d946
