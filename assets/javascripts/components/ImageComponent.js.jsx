import React from "react/addons";

export default class ImageComponent extends React.Component {

  static displayName = "Image";
  static propTypes = {
    image: React.PropTypes.shape({
      caption: React.PropTypes.string,
      small: React.PropTypes.string,
      local: React.PropTypes.string
    }),
    index: React.PropTypes.number,
    handleCaptionChange: React.PropTypes.func
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="image">
        <button />
        <img src={this.props.image.small || this.props.image.local}/>
        <input type="text" value={this.props.image.caption}
          onChange={this.props.handleCaptionChange.bind(null, this.props.index)}/>
      </div>
    );
  }

}
