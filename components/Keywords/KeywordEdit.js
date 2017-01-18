import React from 'react';
import axios from 'axios';

class KeywordEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      english: '',
      french: '',
      key: 0,
    };
    this.editSubmit = this.editSubmit.bind(this);
    this.newSubmit = this.newSubmit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEnglish = this.handleEnglish.bind(this);
    this.handleFrench = this.handleFrench.bind(this);
  }

  componentDidMount() {
    this.setState({
      english: this.props.selectedKeyword.english,
      french: this.props.selectedKeyword.french,
      key: this.props.selectedKeyword.key,
    });
  }

  handleEnglish(event) {
    this.setState({
      english: event.target.value,
    });
  }

  handleFrench(event) {
    this.setState({
      french: event.target.value,
    });
  }

  editSubmit() {
    const url = `http://localhost:4000/api/keywords/${this.state.key}`;
    axios.put(url, {
      english: this.state.english,
      french: this.state.french,
      token: localStorage.token,
    })
    .then((response) => {
      console.log(response);
      this.props.closeModal();
    })
    .catch((error) => {
      console.log(error);
    });
  }

  newSubmit() {
    const url = `http://localhost:4000/api/keywords`;
    axios.post(url, {
      english: this.state.english,
      french: this.state.french,
      token: localStorage.token,
    })
    .then((response) => {
      console.log(response);
      this.props.closeModal();
    })
    .catch((error) => {
      console.log(error);
    });
  }

  handleSubmit() {
    if (this.state.key === 0) {
      this.newSubmit();
    } else {
      this.editSubmit();
    }
  }

  handleDelete() {
    const url = `http://localhost:4000/api/keywords/${this.state.key}`;
    axios({
      method: 'delete',
      url,
      data: { token: localStorage.token, },
      params: {
        force: true,
      },
    }).then((response) => {
      console.log(response);
      this.props.closeModal();
    })
    .catch((error) => {
      console.log(error);
    });
  }

  render() {
    const deletethis = (this.state.key === 0) ? null : <button onClick={this.handleDelete}>Delete</button>;
    return (
      <div>
        english:
        <input onChange={this.handleEnglish} type="text" style={{width:400,marginRight:20}} value={this.state.english} />
        francais:
        <input onChange={this.handleFrench} type="text" style={{width:400}} width="200" value={this.state.french} />
        <div>
        <button onClick={this.props.closeModal}>close</button>
        {deletethis}
        <button onClick={this.handleSubmit} className={'button-primary'}>Submit</button>
        </div>
      </div>
    );
  }
}

export default KeywordEdit;

