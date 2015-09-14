import React from 'react/addons';

export default class SidebarComponent extends React.Component {

  static displayName = 'Sidebar';
  static propTypes = {
    handler: React.PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      containers: [
        'create',
        'index',
        'pending',
        'images'
      ]
    };
  }

  renderChoices() {
    let choices = [];
    this.state.containers.forEach((container) => {
      choices.push(
        <button onClick={this.props.handler.bind(null, container)}>{container}</button>
      );
    });
    return choices;
  }

  render() {
    return (
      <div className="sidebar">
        {this.renderChoices()}
      </div>
    );
  }

}
