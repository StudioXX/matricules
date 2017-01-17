import React from 'react';
import axios from 'axios';
import KeywordEdit from './KeywordEdit';

class Keywords extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keywords: [],
    };
    this.handleEnglish = this.handleEnglish.bind(this);
    this.handleFrench = this.handleFrench.bind(this);
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

  handleEnglish(i, event) {
    const state = this.state.keywords;
    console.log(event.target.value)
    state[i].english = event.target.value;
    this.setState({ keywords: state, });
  }

  handleFrench(i, event) {
    const state = this.state.keywords;
    state[i].french = event.target.value;
    this.setState({ keywords: state, });
  }

  render() {
    return (<div>
      {this.state.keywords.map((keyword, i) => {
        return (
          <KeywordEdit key={i} englishhandler={this.handleEnglish.bind(this, i)} frenchhandler={this.handleFrench.bind(this, i)} key={i} english={keyword.english} french={keyword.french} />
        )
      })}
    </div>
    );
  }
}

export default Keywords;
