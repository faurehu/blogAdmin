import React from 'react/addons';
import MarkdownEditorContent from './MarkdownEditorContent';
import MarkdownEditorMenu from './MarkdownEditorMenu';
import MarkdownEditorPreview from './MarkdownEditorPreview';
import MarkdownEditorTabs from './MarkdownEditorTabs';
import {
  RegularMarkdownToken,
  HeaderMarkdownToken,
  SubHeaderMarkdownToken,
  UrlMarkdownToken,
  ListMarkdownToken,
  ImageMarkdownToken,
  NullMarkdownToken
} from './MarkdownTokenFactory';

export default class MarkdownEditor extends React.Component {

  static displayName = 'Markdown Editor';
  static propTypes = {
    initialContent: React.PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      content: props.initialContent || '',
      inEditMode: true,
      enabled: false
    };
  }

  onChangeHandler = (e) => {
    this.setState({
      content: e.target.value
    });
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

  handleSelection = (selection) => {
    this.setState({
      selection: selection,
      enabled: selection ? true : false
    });
  }

  handleTabClick = (inEditMode) => {
    this.setState({
      inEditMode: inEditMode
    });
  }

  handleEdit = (tokenType) => {
    if(this.state.selection !== null) {
      let text = this.state.content;
      let selection = this.state.selection;
      let token = this.getMarkdownToken(tokenType);
      var beforeSelectionContent = text.slice(0, selection.selectionStart);
      var afterSelectionContent = text.slice(selection.selectionEnd, text.length);
      var updatedText = token.applyTokenTo(selection.selectedText);
      let updatedContent = beforeSelectionContent + updatedText + afterSelectionContent;
      this.setState({content: updatedContent, selection: null, enabled: false});
    }
  }

  render() {
    let divContent, editorMenu;
    if (this.state.inEditMode) {
      divContent = (<MarkdownEditorContent content={this.state.content}
        onChangeHandler={this.onChangeHandler} handleSelection={this.handleSelection}/>);
      editorMenu = <MarkdownEditorMenu enabled={this.state.enabled} handleEdit={this.handleEdit}/>;
    } else {
      divContent = <MarkdownEditorPreview content={this.state.content} />;
    }
    return (
      <div className="md-editor">
        <div className="md-editor-header row">
          {editorMenu}
          <MarkdownEditorTabs handleClick={this.handleTabClick} inEditMode={this.state.inEditMode}/>
        </div>
        {divContent}
      </div>
    );
  }

}
