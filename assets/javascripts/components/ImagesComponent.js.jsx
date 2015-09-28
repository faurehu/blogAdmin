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
    setImages: React.PropTypes.func
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

  renderImages() {
    let images = [];
    this.props.images.forEach((image) => {
      images.push(
        <ImageComponent image={image.dataValues} key={image.dataValues.id}/>
      );
    });
    return images;
  }

  render() {
    return (
      <div className="images main-content">
        {this.props.images && this.renderImages()}
      </div>
    );
  }

}
