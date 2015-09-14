import React from 'react/addons';
import SidebarComponent from './SidebarComponent';
import ViewComponent from './ViewComponent';
import IndexComponent from './IndexComponent';
import ImagesComponent from './ImagesComponent';
import PendingComponent from './PendingComponent';

export default class CommentComponent extends React.Component {

  static displayName = 'Comment';
  static propTypes = {};

  constructor(props) {
    super(props);
    this.ipc = global.ipc;
    this.state = {
      container: 'create'
    };
  }

  onContainerSelect = (container) => {
    this.setState({
      container: container
    });
  }

  handlePostSubmit = (values) => {
    this.ipc.on('post-submit-reply', function(arg) {
      console.log(arg);
    });
    this.ipc.send('post-submit', values);
  }

  renderContainer() {
    let container;
    switch (this.state.container) {
      case 'create':
        container = <ViewComponent submitHandler={this.handlePostSubmit}/>;
        break;
      case 'index':
        container = <IndexComponent />;
        break;
      case 'images':
        container = <ImagesComponent />;
        break;
      case 'pending':
        container = <PendingComponent />;
        break;
    }
    return container;
  }

  render() {
    return (
      <div className="app">
        <SidebarComponent handler={this.onContainerSelect}/>
        {this.renderContainer()}
      </div>
    );
  }

}
