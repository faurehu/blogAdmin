import React from 'react/addons';
import SidebarComponent from './SidebarComponent';
import ViewComponent from './ViewComponent';
import IndexComponent from './IndexComponent';
import ImagesComponent from './ImagesComponent';

export default class AppComponent extends React.Component {

  static displayName = 'App';
  static propTypes = {};

  constructor(props) {
    super(props);
    this.ipc = global.ipc;
    this.jQuery = global.jQuery;
    this.ipc.on('post-deleted', (arg) => {
      if (arg === 'success') {
        this.setState({
          view: 1
        });
      }
    });
    this.ipc.on('post-submit-reply', (arg) => {
      if (arg === 'success') {
        this.setState({
          view: 1
        });
      }
    });
    this.ipc.on('post-updated', (arg) => {
      if(arg === 'success') {
        this.setState({
          view: 1
        });
      }
    });
    this.ipc.on('posts-saved', (arg) => {
      console.log(arg);
    });
    this.state = {
      postIndex: -1,
      isMenuEnabled: false,
      readyForSubmit: false,
      inEditMode: true,
      view: 0
    };
  }

  getPostEditor = (postIndex) => {
    let post = this.state.posts[postIndex].dataValues;
    this.setState({
      postIndex: postIndex,
      post: this.jQuery.extend(true, {}, post),
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
    this.checkIfReady();
  }

  handlePostDelete = (id) => {
    this.ipc.send('delete-post', id);
  }

  handlePostSubmit = () => {
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

  handleImagesFetch = (images) => {
    this.setState({
      images: images.map((image) => { return image.dataValues; })
    });
  }

  handleImagesSave = () => {
    this.ipc.send('save-images', this.state.images);
  }

  handlePostUpdate = () => {
    this.ipc.send('update-post', {
      content: this.state.post.content,
      title: this.state.post.title,
      subtitle: this.state.post.subtitle,
      id: this.state.post.id
    });
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
    let { posts, readyForSubmit, isMenuEnabled, inEditMode, post, images } = this.state;

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
      inEditMode: inEditMode,
      handlePostUpdate: this.handlePostUpdate,
      insertImage: this.insertImage
    };

    let views = [
      <ViewComponent ref="postView" {...viewProps}/>,
      <IndexComponent getPostEditor={this.getPostEditor} posts={posts}
        setPosts={this.handlePostsFetch} ref="indexView"/>,
      <ImagesComponent setImages={this.handleImagesFetch} images={images}
        addImage={this.addImage} onSave={this.handleImagesSave}/>
    ];

    return views[this.state.view];
  }

  render() {
    return (
      <div className="app">
        <SidebarComponent handler={this.handleViewChange}/>
        {this.renderView()}
      </div>
    );
  }

  checkIfReady() {
    let { postIndex, inEditMode, posts } = this.state;
    let currentPost = postIndex > -1 ? posts[postIndex].dataValues : undefined;
    let postView = this.refs.postView.refs;
    let title = React.findDOMNode(postView.title).value;
    let subtitle = React.findDOMNode(postView.subtitle).value;
    let content = inEditMode && React.findDOMNode(postView.editor.refs.content.refs.editor).value;
    let isNotEmpty = (inEditMode && title.trim() !== '' && subtitle.trim() !== '' && content && content.trim() !== '') ||
    (!inEditMode && title.trim() !== '' && subtitle.trim() !== '');
    let isNewContent = currentPost && currentPost.title !== title || currentPost && currentPost.subtitle !== subtitle ||
      inEditMode && currentPost && currentPost.content !== content;
    this.setState({
      readyForSubmit: currentPost ? isNotEmpty && isNewContent : isNotEmpty
    });
  }

  insertImage = (position, path) => {
    let post = this.state.post || {};
    let preContent = post.content ? post.content.slice(0, position) : '';
    let postContent = post.content ? post.content.slice(position, post.content.length) : '';
    post.content = `${preContent}![](${path})${postContent}`;
    this.setState({
      post: post
    });
  }

  addImage = (path) => {
    let images = this.state.images;
    images.push({
      local: path,
      id: images.length
    });
    this.setState({
      images: images
    });
  }
}
