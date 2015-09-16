import React from 'react/addons';
import MarkdownEditor from './Editor/MarkdownEditor';

export default class ViewComponent extends React.Component {

  static displayName = 'View';
  static propTypes = {
    title: React.PropTypes.string,
    subtitle: React.PropTypes.string,
    content: React.PropTypes.string,
    submitHandler: React.PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
      subtitle: props.subtitle,
      content: props.content
    };
  }

  handleChange = (type, e) => {
    this.setState({
      [type]: e.target.value
    });
  }

  render() {
    return (
      <div className="view main-content">
        <div className="titles-box">
          <label htmlFor="title">Title</label>
          <input value={this.state.title} className="post-title" name="title" type="text"
            onChange={this.handleChange.bind(null, 'title')}/>
          <br />
          <label htmlFor="subtitle">Subtitle</label>
          <input value={this.state.subtitle} className="post-title" name="subtitle" type="text"
            onChange={this.handleChange.bind(null, 'subtitle')}/>
        </div>
        <MarkdownEditor/>
        <div className="footer-box">
          <button onClick={this.props.submitHandler.bind(null, this.state)} className="btn btn-default submit">
            Submit
          </button>
        </div>
      </div>
    );
  }

}
