import React from "react/addons";

export default class PostComponent extends React.Component {

  static displayName = "Post";
  static propTypes = {
    post: React.PropTypes.shape({
      title: React.PropTypes.string,
      subtitle: React.PropTypes.string,
      content: React.PropTypes.string
    })
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let { title, subtitle, content} = this.props.post;
    return (
      <div className="post">
        <h1 className="post-title">{title}</h1>
        <h2 className="post-subtitle">{subtitle}</h2>
        <h3 className="post-content">{content}</h3>
      </div>
    );
  }

}
