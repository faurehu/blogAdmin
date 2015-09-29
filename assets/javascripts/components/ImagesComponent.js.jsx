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
    handleCaptionChange: React.PropTypes.func
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
      images.push(
        <ImageComponent image={image} key={image.id} index={this.props.images.indexOf(image)}
          handleCaptionChange={this.props.handleCaptionChange}/>
      );
    });
    return images;
  }

  renderSaveButton() {
    let canSave = true;
    this.props.images.forEach((image) => {
      if(image.caption === undefined || (image.local === undefined && image.small === undefined && image.caption === undefined)) {
        canSave = false;
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
