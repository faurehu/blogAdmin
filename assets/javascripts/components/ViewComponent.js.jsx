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
    post: React.PropTypes.shape({
      title: React.PropTypes.string,
      subtitle: React.PropTypes.string,
      content: React.PropTypes.string,
      id: React.PropTypes.number
    }),
    submitHandler: React.PropTypes.func,
    onContainerSelect: React.PropTypes.func,
    handlePostDelete: React.PropTypes.func,
    onInputChange: React.PropTypes.func,
    handleContentUpdate: React.PropTypes.func,
    readyForSubmit: React.PropTypes.bool,
    handleTabClick: React.PropTypes.func,
    handleSelection: React.PropTypes.func,
    isMenuEnabled: React.PropTypes.bool,
    inEditMode: React.PropTypes.bool
  };

  constructor(props) {
    super(props);
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

  handleEdit = (tokenType) => {
    let post = this.props.post;
    if(post.selection !== null) {
      let text = post.content;
      let selection = post.selection;
      let token = this.getMarkdownToken(tokenType);
      let beforeSelectionContent = text.slice(0, selection.selectionStart);
      let afterSelectionContent = text.slice(selection.selectionEnd, text.length);
      let updatedText = token.applyTokenTo(selection.selectedText);
      let updatedContent = beforeSelectionContent + updatedText + afterSelectionContent;
      this.props.handleContentUpdate(updatedContent);
    }
  }

  renderFooter() {

    let {
      onContainerSelect,
      handlePostDelete,
      submitHandler,
      readyForSubmit,
      post
    } = this.props;

    return (
      <div className="footer-box">
        {post && post.id &&
          <button onClick={onContainerSelect.bind(null, 1)} className="btn btn-default cancel">
            Cancel
          </button>
        }
        {post && post.id &&
          <button onClick={handlePostDelete.bind(null, post.id)}
            className="btn btn-default delete">
            Delete
          </button>
        }
        <button onClick={submitHandler} disabled={readyForSubmit ? '' : 'disabled'}
          className="btn btn-default submit">
          {post && post.id ? 'Update' : 'Submit'}
        </button>
      </div>
    );
  }

  render() {
    let {
      post,
      onInputChange,
      handleTabClick,
      handleContentUpdate,
      handleSelection,
      isMenuEnabled,
      inEditMode
    } = this.props;

    let editorProps = {
      content: post && post.content,
      onChangeHandler: onInputChange.bind(null, 'content'),
      handleEdit: this.handleEdit,
      handleContentUpdate: handleContentUpdate,
      handleTabClick: handleTabClick,
      handleSelection: handleSelection,
      isMenuEnabled: isMenuEnabled,
      inEditMode: inEditMode
    };

    return (
      <div className="view main-content">
        <div className="titles-box">
          <label htmlFor="title">Title</label>
          <input value={post && post.title} className="post-title" name="title" type="text"
            onChange={onInputChange.bind(null, 'title')} ref="title"/>
          <br />
          <label htmlFor="subtitle">Subtitle</label>
          <input value={post && post.subtitle} className="post-title" name="subtitle" type="text"
            onChange={onInputChange.bind(null, 'subtitle')} ref="subtitle"/>
        </div>
        <MarkdownEditor ref="editor" {...editorProps}/>
        { this.renderFooter() }
      </div>
    );
  }

}
