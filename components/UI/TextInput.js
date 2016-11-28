import React from 'react';
import css from 'next/css';

const style = css({
  height: '38px',
  padding: '6px 10px',
  backgroundColor: '#fff',
  border: '1px solid #D1D1D1',
  borderRadius: '4px',
  boxShadow: 'none',
  boxSizing: 'border-box',
});

class TextInput extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <input className={style} type="text" onChange={this.props.handler} value={this.props.text} placeholder={this.props.placeholder} />
      </div>
    );
  }
}

TextInput.propTypes = {
  placeholder: React.PropTypes.string,
  text: React.PropTypes.string,
};

export default TextInput;
