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
      container: <ViewComponent submitHandler={this.handlePostSubmit}/>
    };
  }

  onContainerSelect = (container) => {
    switch (container) {
      case 'create':
        this.setState({
          container: <ViewComponent submitHandler={this.handlePostSubmit}/>
        });
        break;
      case 'index':
        this.ipc.send('fetch-all-posts');
        this.ipc.on('posts-fetched', (arg) => {
          this.setState({
            container: <IndexComponent posts={arg}/>
          });
        });
        break;
      case 'images':
        this.setState({
          container: <ImagesComponent/>
        });
        break;
      case 'pending':
        this.setState({
          container: <PendingComponent/>
        });
        break;
    }
  }

  handlePostSubmit = (values) => {
    this.ipc.on('post-submit-reply', (arg) => {
      console.log(arg);
    });
    this.ipc.send('post-submit', values);
  }

  render() {
    return (
      <div className="app">
        <SidebarComponent handler={this.onContainerSelect}/>
        {this.state.container}
      </div>
    );
  }

}
