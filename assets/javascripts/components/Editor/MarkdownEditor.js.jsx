import React from 'react/addons';
import MarkdownEditorContent from './MarkdownEditorContent';
import MarkdownEditorMenu from './MarkdownEditorMenu';
import MarkdownEditorPreview from './MarkdownEditorPreview';
import MarkdownEditorTabs from './MarkdownEditorTabs';

export default class MarkdownEditor extends React.Component {

  static displayName = 'Markdown Editor';
  static propTypes = {
    content: React.PropTypes.string,
    onChangeHandler: React.PropTypes.func,
    handleEdit: React.PropTypes.func,
    handleContentUpdate: React.PropTypes.func,
    handleTabClick: React.PropTypes.func,
    handleSelection: React.PropTypes.func,
    isMenuEnabled: React.PropTypes.bool,
    inEditMode: React.PropTypes.bool
  };

  constructor(props) {
    super(props);
  }

  render() {
    let divContent, editorMenu;

    let {
      content,
      onChangeHandler,
      isMenuEnabled,
      handleEdit,
      handleTabClick,
      inEditMode,
      handleSelection
    } = this.props;

    if (inEditMode) {
      divContent = (<MarkdownEditorContent content={content} ref="content"
        onChangeHandler={onChangeHandler} handleSelection={handleSelection}/>);
      editorMenu = <MarkdownEditorMenu enabled={isMenuEnabled} handleEdit={handleEdit}/>;
    } else {
      divContent = <MarkdownEditorPreview content={content} />;
    }
    return (
      <div className="md-editor">
        <div className="md-editor-header row">
          {editorMenu}
          <MarkdownEditorTabs handleClick={handleTabClick} inEditMode={inEditMode}/>
        </div>
        {divContent}
      </div>
    );
  }

}
