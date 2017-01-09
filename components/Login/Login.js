import React from 'react';
import axios from 'axios';
import { setToken, unsetToken } from '../../utils/auth';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userfield: '',
      passfield: '',
    };
    this.handleUser = this.handleUser.bind(this);
    this.handlePass = this.handlePass.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
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

  handleLogin(event) {
    // login here
    axios.post('http://localhost:4000/auth/login', {
      username: this.state.userfield,
      password: this.state.passfield,
    })
    .then((response) => {
      // console.log(response);
      if (response.status === 200) {
        setToken(response.data.token);
        this.props.url.push('/');
      // this.props.url.pushTo(viewurl);
      } else {
        console.log(response);
        alert('unknown response, see console');
      }
    })
    .catch((error) => {
      alert('unauthorized');
    });
  }
  render() {
    return (
      <div>
      <h1>Login</h1>
        <div>
          <input type="text" onChange={this.handleUser} value={this.state.userfield} placeholder="username" />
        </div>
        <div>
          <input type="text" onChange={this.handlePass} value={this.state.passfield} placeholder="password" />
        </div>
        <div>
          <button onClick={this.handleLogin} className={'button-primary'}>Login</button>
        </div>
      </div>
    );
  }
}

export default Login;
