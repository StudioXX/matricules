import React from 'react';
import axios from 'axios';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userfield: '',
      passfield: '',
    };
    this.handleUser = this.handleUser.bind(this);
    this.handlePass = this.handlePass.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
  }

  handleUser(event) {
    this.setState({
      userfield: event.target.value,
    });
  }

  handlePass(event) {
    this.setState({
      passfield: event.target.value,
    });
  }

  handleRegister(event) {
    axios.post('http://localhost:4000/auth/register', {
      username: this.state.userfield,
      password: this.state.passfield,
    })
    .then((response) => {
      console.log(response.status);
      if (response.status === 200) {
        this.props.url.push('/');
      } else {
        // TODO show error in UI
        alert('error');
      }
    })
    .catch((error) => {
      // TODO show error in UI
      alert(error);
    });
  }
  render() {
    return (
      <div>
      <h1>Register</h1>
        <div>
          <input type="text" onChange={this.handleUser} value={this.state.userfield} placeholder="username" />
        </div>
        <div>
          <input type="text" onChange={this.handlePass} value={this.state.passfield} placeholder="password" />
        </div>
        <div>
          <button onClick={this.handleRegister} className={'button-primary'}>Register</button>
        </div>
      </div>
    );
  }
}

export default Register;
