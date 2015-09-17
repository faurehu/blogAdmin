import React from 'react/addons';
import MarkdownEditorContent from './MarkdownEditorContent';
import MarkdownEditorMenu from './MarkdownEditorMenu';
import MarkdownEditorPreview from './MarkdownEditorPreview';
import MarkdownEditorTabs from './MarkdownEditorTabs';

export default class MarkdownEditor extends React.Component {

  static displayName = 'Markdown Editor';
  static propTypes = {
    onChangeHandler: React.PropTypes.func,
    content: React.PropTypes.string,
    handleContentUpdate: React.PropTypes.func,
    handleEdit: React.PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      inEditMode: props.content === undefined,
      enabled: false
    };
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

  render() {
    let divContent, editorMenu;
    if (this.state.inEditMode) {
      divContent = (<MarkdownEditorContent content={this.props.content} ref="content"
        onChangeHandler={this.props.onChangeHandler} handleSelection={this.handleSelection}/>);
      editorMenu = <MarkdownEditorMenu enabled={this.state.enabled} handleEdit={this.props.handleEdit}/>;
    } else {
      divContent = <MarkdownEditorPreview content={this.props.content} />;
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
