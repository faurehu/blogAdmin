import React from "react/addons";

export default class ViewComponent extends React.Component {

  static displayName = "View";
  static propTypes = {
    title: React.PropTypes.string,
    subtitle: React.PropTypes.string,
    text: React.PropTypes.string,
    submitHandler: React.PropTypes.handleSubmit
  };

  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
      subtitle: props.subtitle,
      text: props.text
    };
  }

  handleChange = (type, e) => {
    this.setState({
      [type]: e.target.value
    });
  }

  render() {
    return (
      <div className="view">
        <label htmlFor="title">Title</label>
        <input value={this.state.title} className="post-title" name="title" type="text"
          onChange={this.handleChange.bind(null, 'title')}/>
        <label htmlFor="subtitle">Subtitle</label>
        <input value={this.state.subtitle} className="post-subtitle" name="subtitle" type="text"
          onChange={this.handleChange.bind(null, 'subtitle')}/>
        <label htmlFor="text">Text</label>
        <input value={this.state.text} className="post-text" name="text" type="text"
          onChange={this.handleChange.bind(null, 'text')}/>
        <button onClick={this.props.submitHandler.bind(null, this.state)}>Submit</button>
      </div>
    );
  }

}
