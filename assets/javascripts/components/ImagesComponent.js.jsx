import React from 'react/addons';
import ImageComponent from './ImageComponent';

export default class ImagesComponent extends React.Component {

  static displayName = 'Images';
  static propTypes = {
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
    return (<ImageComponent />);
  }

  render() {
    return (
      <div className="images main-content">
        {this.renderImages()}
      </div>
    );
  }

}
