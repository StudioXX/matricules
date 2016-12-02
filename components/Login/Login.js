import React from 'react';
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
      userfield: event.value,
    });
  }

  handlePass(event) {
    this.setState({
      passfield: event.value,
    });
  }

  handleLogin(event) {
    // login here
    setToken('123');
    this.props.url.pushTo('/');
  }
  render() {
    return (
      <div>
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
