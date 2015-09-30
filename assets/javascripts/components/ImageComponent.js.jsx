import React from "react/addons";

export default class ImageComponent extends React.Component {

  static displayName = "Image";
  static propTypes = {
    image: React.PropTypes.shape({
      caption: React.PropTypes.string,
      small: React.PropTypes.string,
      local: React.PropTypes.string,
      edit: React.PropTypes.string
    }),
    index: React.PropTypes.number,
    handleCaptionChange: React.PropTypes.func,
    handleImageDelete: React.PropTypes.func
  };

  constructor(props) {
    super(props);
  }

  render() {
    let value;
    if(this.props.image.edit === '') {
      value = '';
    } else if (this.props.image.edit !== undefined) {
      value = this.props.image.edit;
    } else {
      value = this.props.image.caption;
    }
    return (
      <div className="image">
        <button onClick={this.props.handleImageDelete.bind(null, this.props.index)}>
          x
        </button>
        <img src={this.props.image.small || this.props.image.local}/>
        <input type="text" value={value}
          onChange={this.props.handleCaptionChange.bind(null, this.props.index)}/>
      </div>
    );
  }

}
