import React from 'react';
import LinkItemEdit from './LinkItemEdit';

class LinkListEdit extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const links = this.props.links;
    return (
      <div>
      </div>
    );
  }
}

export default LinkListEdit;

/*

{links.map((link, i) => {
          return (<LinkItemEdit iterator={i} handler={this.props.handler} key={i} url={link.url} title={link.title} />);
        })}

        */