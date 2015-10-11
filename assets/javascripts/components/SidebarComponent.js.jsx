import React from 'react/addons';

export default class SidebarComponent extends React.Component {

  static displayName = 'Sidebar';
  static propTypes = {
    handler: React.PropTypes.func,
    active: React.PropTypes.number
  };

  constructor(props) {
    super(props);
    this.containers = [
      'Create',
      'Index',
      'Images'
    ];
  }

  renderChoices() {
    let choices = [];
    this.containers.forEach((container) => {
      let index = this.containers.indexOf(container);
      choices.push(
        <li onClick={this.props.handler.bind(null, index)}
          key={index} role="presentation"
          className={this.props.active === index ? 'active' : ''}>
          {container}
        </li>
      );
    });
    return choices;
  }

  render() {
    return (
      <ul className="sidebar nav nav-pills nav-stacked">
        {this.renderChoices()}
      </ul>
    );
  }

}
