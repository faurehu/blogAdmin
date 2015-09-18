import React from 'react/addons';

export default class MarkdownEditorTabs extends React.Component {

  static displayName = 'Markdown Editor Tabs';
  static propTypes = {
    handleClick: React.PropTypes.func,
    inEditMode: React.PropTypes.bool
  };

  constructor(props) {
    super(props);
  }

  render() {
    let editorTabClass = `editor-tab ${this.props.inEditMode ? 'active' : ''}`;
    let previewTabClass = `preview-tab ${this.props.inEditMode ? '' : 'active'}`;
    return (
      <div className="md-editor-tabs col-md-4">
        <ul className="tabs nav nav-tabs">
            <li className={editorTabClass}
                onClick={this.props.handleClick.bind(null, true)}><a>Editor</a></li>
              <li className={previewTabClass}
                onClick={this.props.handleClick.bind(null, false)}><a>Preview</a></li>
        </ul>
      </div>
    );
  }

}
