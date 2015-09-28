import React from 'react/addons';

export default class SidebarComponent extends React.Component {

  static displayName = 'Sidebar';
  static propTypes = {
    handler: React.PropTypes.func
  };

  constructor(props) {
    super(props);
    this.containers = [
      'create',
      'index',
      'images'
    ];
  }

  renderChoices() {
    let choices = [];
    this.containers.forEach((container) => {
      let index = this.containers.indexOf(container);
      choices.push(
        <button onClick={this.props.handler.bind(null, index)}
          className="sidebar-button"
          key={index}>
          {container}
        </button>
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
