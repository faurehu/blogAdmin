import React from 'react/addons';

export default class MarkdownEditorContent extends React.Component {

  static displayName = 'Markdown Editor Content';
  static propTypes = {
    content: React.PropTypes.string,
    handleSelection: React.PropTypes.func,
    onChangeHandler: React.PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    if (this.refs.editor != null) {
      this.textAreaElem = React.findDOMNode(this.refs.editor);
      this.textAreaElem.addEventListener('select', this.onSelectHandler);
    }
  }

  componentWillUnmount() {
    this.textAreaElem.removeEventListener('select', this.onSelectHandler);
  }

  onSelectHandler = (e) => {

    let selectionStart = e.target.selectionStart;
    let selectionEnd = e.target.selectionEnd;

    let selection = {
      selectionStart: selectionStart,
      selectionEnd: selectionEnd,
      selectedText: e.target.value.slice(selectionStart, selectionEnd)
    };

    this.props.handleSelection(selection);
  }

  render() {
    return (
      <textarea ref="editor" className="md-editor-textarea"
        value={this.props.content}
        onChange={this.props.onChangeHandler}
        onClick={this.props.handleSelection.bind(null, null)}
        onKeyUp={this.props.handleSelection.bind(null, null)}/>
    );
  }

}
