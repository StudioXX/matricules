import React from 'react';
import css from 'next/css';
import Link from 'next/link';
import Cookie from 'js-cookie';
import { setToken, unsetToken } from '../../utils/auth';
import Button from '../UI/Button';

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
    this.changeLang = this.changeLang.bind(this);
  }

  handleLogout() {
    console.log('logging out');
    unsetToken();
    this.props.url.pushTo('/logout');
  }

  changeLang() {
    if (this.props.language === 'fr') {
      window.localStorage.setItem('language', 'eng');
      Cookie.set('language', 'eng');
    } else {
      window.localStorage.setItem('language', 'fr');
      Cookie.set('language', 'fr');
    }
    // this.props.url.pushTo(this.props.path);
    window.location.reload();
  }

  render() {
    const logButton = this.props.loggedUser ? <button onClick={this.handleLogout} className={'button-primary'}>Logout</button> : <Link href="/login"><button className={'button-primary'}>Login</button></Link>;
    const langButton = this.props.language === 'fr' ? <button onClick={this.changeLang} className={'button-primary'}>English</button> : <button onClick={this.changeLang} className={'button-primary'}>French</button>;
    const addButton = this.props.loggedUser ? <Button text="Add Document" link="/add" /> : null;
    return (
      <div className={styles.menu}>
        <span className={styles.menuitem}><Link href="/">studio xx matricules app</Link></span>
        <span className={styles.menuitem}><Link href="/documents">documents list</Link></span>
        <span className={styles.menuitem}><Link href="/about">about</Link></span>
        {logButton}
        {langButton}
        {addButton}
      </div>
    );
  }
}



export default Header;
