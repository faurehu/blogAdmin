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
      content: props.content,
      readyForSubmit: false
    };
  }

  handleChange = (type, e) => {
    this.setState({
      [type]: e.target.value
    });
    this.checkForEmptyFields();
  }

  handleContentUpdate = (content) => {
    this.setState({
      content: content
    });
  }

  render() {
    return (
      <div className="view main-content">
        <div className="titles-box">
          <label htmlFor="title">Title</label>
          <input value={this.state.title} className="post-title" name="title" type="text"
            onChange={this.handleChange.bind(null, 'title')} ref="title"/>
          <br />
          <label htmlFor="subtitle">Subtitle</label>
          <input value={this.state.subtitle} className="post-title" name="subtitle" type="text"
            onChange={this.handleChange.bind(null, 'subtitle')} ref="subtitle"/>
        </div>
        <MarkdownEditor content={this.state.content} onChangeHandler={this.handleChange.bind(null, 'content')}
          handleContentUpdate={this.handleContentUpdate} ref="editor"/>
        <div className="footer-box">
          <button onClick={this.props.submitHandler.bind(null, this.state)} disabled={this.state.readyForSubmit ? '' : 'disabled'}
            className="btn btn-default submit">
            Submit
          </button>
        </div>
      </div>
    );
  }

  checkForEmptyFields() {
    let title = React.findDOMNode(this.refs.title).value;
    let subtitle = React.findDOMNode(this.refs.subtitle).value;
    let content = React.findDOMNode(this.refs.editor.refs.content.refs.editor).value;
    let readyForSubmit = title.trim() !== '' && subtitle.trim() !== '' && content.trim() !== '';
    this.setState({
      readyForSubmit: readyForSubmit
    });
  }

}
