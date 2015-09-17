import React from "react/addons";

export default class PostComponent extends React.Component {

  static displayName = "Post";
  static propTypes = {
    post: React.PropTypes.shape({
      title: React.PropTypes.string,
      subtitle: React.PropTypes.string,
      content: React.PropTypes.string,
      id: React.PropTypes.number
    }),
    handleClick: React.PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let { title, subtitle, id } = this.props.post;
    return (
      <div className="post" onClick={this.props.handleClick.bind(null, id)}>
        <h1 className="post-title">{title}</h1>
        <h2 className="post-subtitle">{subtitle}</h2>
      </div>
    );
  }

}
