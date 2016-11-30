import React from 'react';
import Link from 'next/link';

class Button extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Link href={this.props.link}>
        <button className={"button-primary"}>{this.props.text}</button>
      </Link>
    );
  }
}

Button.propTypes = {
  text: React.PropTypes.string,
  link: React.PropTypes.string,
};

export default Button;
