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
    getPostEditor: React.PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  renderPosts() {
    let posts = [];
    this.props.posts.forEach((post) => {
      posts.push(
        <PostComponent post={post.dataValues} handleClick={this.props.getPostEditor}/>
      );
    });
    return posts;
  }

  render() {
    return (
      <div className="index main-content">
        {this.renderPosts()}
      </div>
    );
  }

}
