import React from 'react';
import axios from 'axios';

class Keywords extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keywords: [],
    };
  }

  componentDidMount() {
    this.mounted = true;
    const url = `http://localhost:4000/api/keywords`;
    return new Promise((resolve, reject) => (
      axios.get(url)
        .then(response => (resolve(response.data)))
        .catch(error => (reject(error)))
    ))
    .then(
    (_data) => {
      console.log(_data);
      this.setState({ 
        keywords: _data,
      }); },
    (err) => { console.log(err); }
    );
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    return (<div>
      {this.state.keywords.map((keyword) => {
        return (
          <div>{keyword.english}</div>
        )
      })}
    </div>
    );
  }
}

export default Keywords;
