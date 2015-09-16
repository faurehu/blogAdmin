import React from 'react/addons';

export default class PendingComponent extends React.Component {

  static displayName = 'Pending';
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="pending main-content">
        Hello Admin! This is Pending Component!
      </div>
    );
  }

}
