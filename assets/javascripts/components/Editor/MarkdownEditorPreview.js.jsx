import React from 'react/addons';
import marked from 'marked';

export default class MarkdownEditorPreview extends React.Component {

  static displayName = 'MarkdownEditorPreview';
  static propTypes = {
    content: React.PropTypes.string
  };

  constructor(props) {
    super(props);
  }

  render() {

    let htmlContent = this.props.content && marked(this.props.content);

    return (
      <div className="md-editor-preview"
        dangerouslySetInnerHTML={{__html: htmlContent}} />
    );
  }

}
