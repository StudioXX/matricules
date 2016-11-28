import React from 'react';
import Link from 'next/link';
import css from 'next/css';

const style = css({
  display: 'inline-block',
  height: '38px',
  padding: '0 30px',
  color: '#555',
  textAlign: 'center',
  fontSize: '11px',
  fontWeight: '600',
  lineHeight: '38px',
  letterSpacing: '.1rem',
  textTransform: 'uppercase',
  textDecoration: 'none',
  whiteSpace: 'nowrap',
  backgroundColor: 'transparent',
  borderRadius: '4px',
  border: '1px solid #bbb',
  cursor: 'pointer',
  boxSizing: 'border-box',
});

class Button extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Link href={this.props.link}>
      <span className={style}>{this.props.text}</span></Link>
    );
  }
}

Button.propTypes = {
  text: React.PropTypes.string,
  link: React.PropTypes.string,
};

export default Button;
