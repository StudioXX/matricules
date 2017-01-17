import React from 'react';

class OtherList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
      <h2>Other Files List:</h2>
        {this.props.other.map((file, i) => {
          return (
            <div key={i}>
              <a target="blank" href={`http://localhost:4000/${this.props.accession}/${file}`}>
              <h3>{file}</h3></a>
              <button onClick={() => this.props.handleOtherDelete(i)}>Delete</button>
            </div>
          );
        })}
      </div>
    );
  }
}

export default OtherList;
