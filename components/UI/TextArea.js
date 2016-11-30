import React from 'react';

class TextArea extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <textarea value={this.props.value} onChange={this.props.handler} rows="70" style={{width:'100%'}} />
      </div>
    );
  }
}

TextArea.propTypes = {
  text: React.PropTypes.string,
};

export default TextArea;
