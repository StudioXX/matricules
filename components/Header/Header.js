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
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    console.log('logging out');
    unsetToken();
    this.props.url.pushTo('/logout');
  }

  render() {
    const logButton = this.props.loggedUser ? <button onClick={this.handleLogout} className={'button-primary'}>Logout</button> : <Link href="/login"><button className={'button-primary'}>Login</button></Link>;
    return (
      <div className={styles.menu}>
        <span className={styles.menuitem}><Link href="/">studio xx matricules app</Link></span>
        <span className={styles.menuitem}><Link href="/documents">documents list</Link></span>
        <span className={styles.menuitem}><Link href="/about">about</Link></span>
        {logButton}
      </div>
    );
  }
}



export default Header;
