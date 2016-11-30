import React from 'react';
import LinkItemEdit from './LinkItemEdit';

class LinkListEdit extends React.Component {
  constructor(props) {
    super(props);
  }

// here we bind handler function to pass iterator and event
  render() {
    let items;
    if (this.props.links.length === 0) {
      items = <div>no links yet</div>;
    }
    else {
      items = this.props.links.map(function(link, i) {
        return (
          <LinkItemEdit deschandler={this.props.deschandler.bind(this, i)} urlhandler={this.props.urlhandler.bind(this, i)} key={i} url={link.url} title={link.title} />
        );
      }, this);
    }

    let button;
    // if (this.props.links === []) {
    //   button = <button onClick={this.props.addhandler} className={'button-primary'}>Add Link</button>;
    // }
    if (typeof this.props.links[this.props.links.length - 1] === 'object' && this.props.links[this.props.links.length - 1].url === '') {
      button = <button className={'button'} style={{cursor:'auto'}}>Add Link</button>;
    } else {
      button = <button onClick={this.props.addhandler} className={'button-primary'}>Add Link</button>;
    }
    // const button = () ? <button className={'button'} style={{cursor:'auto'}}>Add Link</button> : <button onClick={this.props.addhandler} className={'button-primary'}>Add Link</button>

    return (
      <div>
        {items}
        {button}
      </div>
    );
  }
}

export default LinkListEdit;
