import React from 'react/addons';
import ImageComponent from './ImageComponent';

export default class ImagesComponent extends React.Component {

  static displayName = 'Images';
  static propTypes = {
    images: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        caption: React.PropTypes.string,
        small: React.PropTypes.string
      })
    ),
    setImages: React.PropTypes.func,
    addImage: React.PropTypes.func,
    onSave: React.PropTypes.func,
    handleCaptionChange: React.PropTypes.func,
    handleImageDelete: React.PropTypes.func
  };

  constructor(props) {
    super(props);
    this.ipc = global.ipc;
    this.ipc.on('images-fetched', (arg) => {
      this.props.setImages(arg);
    });
  }

  componentWillMount() {
    this.ipc.send('fetch-all-images');
  }

  componentDidMount() {
    let holder = document.getElementById('images-holder');
    holder.ondragover = () => {
      return false;
    };
    holder.ondragleave = holder.ondragend = () => {
      return false;
    };
    holder.ondrop = (e) => {
      e.preventDefault();
      var file = e.dataTransfer.files[0];
      this.props.addImage(file.path);
      return false;
    };
  }

  renderImages() {
    let images = [];
    this.props.images.forEach((image) => {
      let index = this.props.images.indexOf(image);
      if(image.delete === undefined) {
        images.push(
          <ImageComponent image={image} key={index} index={index}
            handleCaptionChange={this.props.handleCaptionChange}
            handleImageDelete={this.props.handleImageDelete}/>
        );
      }
    });
    return images;
  }

  renderSaveButton() {
    let canSave = false;
    this.props.images.forEach((image) => {
      if(image.delete || image.local !== undefined ||
      (image.edit !== undefined && image.edit !== image.content)) {
        canSave = true;
      }
    });
    if(canSave) {
      return (
        <div className="footer">
          <button onClick={this.props.onSave}>Save</button>
        </div>);
    }
  }

  render() {
    return (
      <div className="images main-content" id="images-holder">
        <div className="images-grid">
          {this.props.images && this.renderImages()}
        </div>
        {this.props.images && this.renderSaveButton()}
      </div>
    );
  }

}
