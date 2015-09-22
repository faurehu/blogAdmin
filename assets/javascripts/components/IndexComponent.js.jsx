import React from 'react/addons';
import PostComponent from './PostComponent';

export default class IndexComponent extends React.Component {

  static displayName = 'Index';
  static propTypes = {
    posts: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        title: React.PropTypes.string,
        subtitle: React.PropTypes.string,
        content: React.PropTypes.string
      })
    ),
    getPostEditor: React.PropTypes.func,
    setPosts: React.PropTypes.func
  };

  constructor(props) {
    super(props);
    this.ipc = global.ipc;
    this.ipc.on('posts-fetched', (arg) => {
      this.props.setPosts(arg);
    });
  }

  componentWillMount() {
    this.ipc.send('fetch-all-posts');
  }

  renderPosts() {
    let posts = [];
    this.props.posts.forEach((post) => {
      posts.push(
        <PostComponent post={post.dataValues} handleClick={this.props.getPostEditor}
          key={post.dataValues.id} postIndex={this.props.posts.indexOf(post)}/>
      );
    });
    return posts;
  }

  render() {
    return (
      <div className="index main-content">
        {this.props.posts && this.renderPosts()}
      </div>
    );
  }

}
