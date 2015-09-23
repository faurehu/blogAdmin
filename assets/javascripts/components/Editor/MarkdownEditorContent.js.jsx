import React from 'react/addons';

export default class MarkdownEditorContent extends React.Component {

  static displayName = 'Markdown Editor Content';
  static propTypes = {
    content: React.PropTypes.string,
    handleSelection: React.PropTypes.func,
    onChangeHandler: React.PropTypes.func,
    insertImage: React.PropTypes.func
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (this.refs.editor != null) {
      let holder = document.getElementById('holder');
      holder.ondragover = () => {
        return false;
      };
      holder.ondragleave = holder.ondragend = () => {
        return false;
      };
      holder.ondrop = (e) => {
        e.preventDefault();
        var file = e.dataTransfer.files[0];
        this.props.insertImage(holder.selectionStart, file.path);
        return false;
      };
      this.textAreaElem = React.findDOMNode(this.refs.editor);
      this.textAreaElem.addEventListener('select', this.onSelectHandler);
    }
  }

  componentDidUpdate() {
    React.findDOMNode(this.refs.editor).value = this.props.content || '';
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
      <textarea ref="editor" className="md-editor-textarea" id="holder"
        value={this.props.content}
        onChange={this.props.onChangeHandler}
        onClick={this.props.handleSelection.bind(null, null)}
        onKeyUp={this.props.handleSelection.bind(null, null)}/>
    );
  }

}
