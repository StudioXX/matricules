import React from 'react';

class TextInput extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <input type="text" onChange={this.props.handler} value={this.props.text} placeholder={this.props.placeholder} />
      </div>
    );
  }
}

TextInput.propTypes = {
  placeholder: React.PropTypes.string,
  text: React.PropTypes.string,
};

export default TextInput;
