import React from 'react';

class LinkItemEdit extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        URL:
        <input onChange={this.props.urlhandler} type="text" style={{width:400,marginRight:20}} value={this.props.url} />
        Description:
        <input onChange={this.props.deschandler} type="text" style={{width:400}} width="200" value={this.props.title} />
      </div>
    );
  }
}

export default LinkItemEdit;
