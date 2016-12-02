import React from 'react';
import css from 'next/css';
import Link from 'next/link';
import { setToken, unsetToken } from '../../utils/auth';

const styles = {
  menu: css({
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '50px',
  }),
  menuitem: css({
    padding: '5px 25px 5px 5px',
  }),
};

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogin() {
    console.log('logging in');
    setToken('123');
    this.props.url.pushTo('/');
  }

  handleLogout() {
    console.log('logging out');
    unsetToken();
    this.props.url.pushTo('/');
  }
  render() {
    return (
      <div className={styles.menu}>
        <span className={styles.menuitem}><Link href="/">studio xx matricules app</Link></span>
        <span className={styles.menuitem}><Link href="/documents">documents list</Link></span>
        <span className={styles.menuitem}><Link href="/about">about</Link></span>

        <button onClick={this.handleLogin} className={'button-primary'}>Login</button>
        <button onClick={this.handleLogout} className={'button-primary'}>Logout</button>
      </div>
    );
  }
}



export default Header;
