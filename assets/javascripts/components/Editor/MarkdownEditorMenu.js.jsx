import React from 'react/addons';

export default class MarkdownEditorMenu extends React.Component {

  static displayName = 'Markdown Editor Menu';
  static propTypes = {
    enabled: React.PropTypes.bool,
    handleEdit: React.PropTypes.func
  };

  constructor(props) {
    super(props);
  }

  render() {

    let disabled = (!this.props.enabled) ? 'disabled' : '';
    let handleEdit = this.props.handleEdit;

    return (
      <div className="md-editor-menu col-md-6 pull-right">
        <div role="button" disabled={disabled} className="btn fa fa-bold"
          onClick={handleEdit.bind(null, 'bold')}></div>
        <div role="button" disabled={disabled} className="btn fa fa-italic"
          onClick={handleEdit.bind(null, 'italic')}></div>
        <div role="button" disabled={disabled} className="btn fa md-editor-menu-header"
          onClick={handleEdit.bind(null, 'header')}>Header</div>
        <div role="button" disabled={disabled} className="btn fa md-editor-menu-subheader"
          onClick={handleEdit.bind(null, 'subheader')}>Subheader</div>
        <div role="button" disabled={disabled} className="btn fa fa-list-ul"
          onClick={handleEdit.bind(null, 'list')}></div>
        <div role="button" disabled={disabled} className="btn fa fa-file-image-o"
          onClick={handleEdit.bind(null, 'image')}></div>
        <div role="button" disabled={disabled} className="btn fa fa-link"
          onClick={handleEdit.bind(null, 'link')}></div>
      </div>
    );
  }

}
