import React from 'react';

class KeywordOne extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        english:
        {this.props.english}
        <span style={{padding: '10px'}}>//</span>
        francais:
        {this.props.french}
        <button onClick={() => this.props.selectKeyword(this.props.obj)} className={'button-primary'}>Edit</button>
      </div>
    );
  }
}

export default KeywordOne;


// input onChange={this.props.englishhandler} type="text" style={{width:400,marginRight:20}} value={this.props.english} />
//         francais:
//         <input onChange={this.props.frenchhandler} type="text" style={{width:400}} width="200" value={this.props.french} />
