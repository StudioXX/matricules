import React from 'react';
import LinkItemEdit from './LinkItemEdit';

class LinkListEdit extends React.Component {
  constructor(props) {
    super(props);
  }

// here we bind handler function to pass iterator and event
  render() {
    const items = this.props.links.map(function(link, i) {
      return (
        <LinkItemEdit deschandler={this.props.deschandler.bind(this, i)} urlhandler={this.props.urlhandler.bind(this, i)} key={i} url={link.url} title={link.title} />
      );
    }, this);

    const button = (this.props.links[this.props.links.length - 1].url === '') ? <button className={'button'} style={{cursor:'auto'}}>Add Link</button> : <button onClick={this.props.addhandler} className={'button-primary'}>Add Link</button>

    return (
      <div>
        {items}
        {button}
      </div>
    );
  }
}

export default LinkListEdit;
