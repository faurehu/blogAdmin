import React from 'react/addons';
import SidebarComponent from './SidebarComponent';
import ViewComponent from './ViewComponent';
import IndexComponent from './IndexComponent';
import ImagesComponent from './ImagesComponent';
import PendingComponent from './PendingComponent';

export default class AppComponent extends React.Component {

  static displayName = 'App';
  static propTypes = {};

  constructor(props) {
    super(props);
    this.ipc = global.ipc;
    this.state = {
      postIndex: -1,
      isMenuEnabled: false,
      readyForSubmit: false,
      inEditMode: true,
      view: 0
    };
  }

  getPostEditor = (postIndex) => {
    this.setState({
      postIndex: postIndex,
      post: this.state.posts[postIndex].dataValues,
      readyForSubmit: false,
      inEditMode: false,
      view: 0
    });
  }

  handleContentUpdate = (updatedContent) => {
    let post = this.state.post || {};
    post.content = updatedContent;
    this.setState({
      post: post
    });
  }

  handleEditorTabClick = (editMode) => {
    this.setState({
      inEditMode: editMode
    });
  }

  handleInputChange = (type, e) => {
    let post = this.state.post || {};
    post[type] = e.target.value;
    this.setState({
      post: post
    });
    this.checkForEmptyFields();
  }

  handlePostDelete = () => {
    console.log('yo');
  }

  handlePostSubmit = () => {
    this.ipc.on('post-submit-reply', (arg) => {
      console.log(arg);
    });
    this.ipc.send('post-submit', {
      content: this.state.post.content,
      title: this.state.post.title,
      subtitle: this.state.post.subtitle
    });
  }

  handlePostsFetch = (posts) => {
    this.setState({
      posts: posts
    });
  }

  handlePostUpdate = () => {
    console.log('handlePostUpdate');
  }

  handleSelection = (selection) => {
    let post = this.state.post || {};
    post.selection = selection;
    this.setState({
      post: post,
      isMenuEnabled: selection !== undefined
    });
  }

  handleViewChange = (viewId) => {
    let postIndex = viewId === 0 ? -1 : this.state.postIndex;
    this.setState({
      view: viewId,
      postIndex: postIndex,
      inEditMode: true,
      post: undefined
    });
  }

  renderView = () => {
    let { posts, readyForSubmit, isMenuEnabled, inEditMode, post } = this.state;

    let viewProps = {
      submitHandler: this.handlePostSubmit,
      post: post,
      onInputChange: this.handleInputChange,
      handleContentUpdate: this.handleContentUpdate,
      onContainerSelect: this.handleViewChange,
      readyForSubmit: readyForSubmit,
      handleTabClick: this.handleEditorTabClick,
      handlePostDelete: this.handlePostDelete,
      handleSelection: this.handleSelection,
      isMenuEnabled: isMenuEnabled,
      inEditMode: inEditMode
    };

    let views = [
      <ViewComponent ref="postView" {...viewProps}/>,
      <IndexComponent getPostEditor={this.getPostEditor} posts={posts}
        setPosts={this.handlePostsFetch}/>,
      <PendingComponent/>,
      <ImagesComponent/>
    ];

    return views[this.state.view];
  }

  render() {
    console.log(this.state);
    return (
      <div className="app">
        <SidebarComponent handler={this.handleViewChange}/>
        {this.renderView()}
      </div>
    );
  }

  checkForEmptyFields = () => {
    let postView = this.refs.postView.refs;
    let title = React.findDOMNode(postView.title).value;
    let subtitle = React.findDOMNode(postView.subtitle).value;
    let content = React.findDOMNode(postView.editor.refs.content.refs.editor).value;
    let readyForSubmit = title.trim() !== '' && subtitle.trim() !== '' && content.trim() !== '';
    this.setState({
      readyForSubmit: readyForSubmit
    });
  }
}
