import React from 'react';

class LinkItemEdit extends React.Component {
  constructor(props) {
    super(props);
    this._onClick = this._onClick.bind(this);
  }

  _onClick() {
    this.props.handler(this.props.iterator);
  }

  render() {
    return (
      <div>
        URL: {this.props.key} 
        <input data-keyy={this.key} onChange={this._onClick} type="text" style={{width:400,marginRight:20}} value={this.props.url} />
        Description:
        <input data-keyy={this.key} type="text" style={{width:400}} width="200" value={this.props.title} />
      </div>
    );
  }
}

export default LinkItemEdit;
