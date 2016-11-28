import React from 'react';

class TextArea extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <textarea value={this.props.value} onChange={this.props.handler} rows="10" cols="100" />
      </div>
    );
  }
}

TextArea.propTypes = {
  text: React.PropTypes.string,
};

export default TextArea;
