import React from 'react/addons';
import MarkdownEditor from './Editor/MarkdownEditor';
import {
  RegularMarkdownToken,
  HeaderMarkdownToken,
  SubHeaderMarkdownToken,
  UrlMarkdownToken,
  ListMarkdownToken,
  ImageMarkdownToken,
  NullMarkdownToken
} from './Editor/MarkdownTokenFactory';

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

  getMarkdownToken = (actionType) => {

    switch (actionType) {
      case "bold":
        return new RegularMarkdownToken("**", true);

      case "italic":
        return new RegularMarkdownToken("_", true);

      case "header":
        return new HeaderMarkdownToken();

      case "subheader":
        return new SubHeaderMarkdownToken();

      case "link":
        return new UrlMarkdownToken();

      case "list":
        return new ListMarkdownToken();

      case "image":
        return new ImageMarkdownToken();

      default:
        return new NullMarkdownToken();
    }
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

  handleEdit = (tokenType) => {
    if(this.state.selection !== null) {
      let text = this.state.content;
      let selection = this.refs.editor.state.selection;
      let token = this.getMarkdownToken(tokenType);
      let beforeSelectionContent = text.slice(0, selection.selectionStart);
      let afterSelectionContent = text.slice(selection.selectionEnd, text.length);
      let updatedText = token.applyTokenTo(selection.selectedText);
      let updatedContent = beforeSelectionContent + updatedText + afterSelectionContent;
      this.handleContentUpdate(updatedContent);
      this.refs.editor.setState({selection: null, enabled: false});
    }
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
          handleContentUpdate={this.handleContentUpdate} ref="editor" handleEdit={this.handleEdit}/>
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
