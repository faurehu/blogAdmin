import React from "react/addons";

export default class ViewComponent extends React.Component {

  static displayName = "View";
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="view">
        Hello Admin! This is View Component!
      </div>
    );
  }

}
