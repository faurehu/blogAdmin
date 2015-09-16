import React from 'react/addons';

export default class ImagesComponent extends React.Component {

  static displayName = 'Images';
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="images main-content">
        Hello Admin! This is Images Component!
      </div>
    );
  }

}
