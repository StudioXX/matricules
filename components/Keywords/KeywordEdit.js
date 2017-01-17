import React from 'react';

class KeywordEdit extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        english:
        <input onChange={this.props.englishhandler} type="text" style={{width:400,marginRight:20}} value={this.props.english} />
        francais:
        <input onChange={this.props.frenchhandler} type="text" style={{width:400}} width="200" value={this.props.french} />
      </div>
    );
  }
}

export default KeywordEdit;
