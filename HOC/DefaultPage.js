import React from 'react';
import css from 'next/css';
import axios from 'axios';
import Head from 'next/head';
import Header from '../components/Header/Header';
import { getUserFromCookie, getUserFromLocalStorage } from '../utils/auth';

const styles = {
  app: css({
    height: '100vh',
    width: '100vw',
  }),
  main: css({
    maxWidth: 1024,
    margin: '0 auto',
    padding: 30,
  }),
};

export default Page => class DefaultPage extends React.Component {
  static getInitialProps(ctx) {
    const path = ctx.pathname;
    const loggedUser = process.browser ? getUserFromLocalStorage() : getUserFromCookie(ctx.req);
    console.log(`loggedUser = ${loggedUser}`)
    // only make this call if we're on a documents page'
    if (path.indexOf('/documents/') === 0 || path.indexOf('/edit/') === 0) {
      const url = `http://localhost:4000/api/documents/${path.split('/')[2]}`;
      return new Promise((resolve, reject) => (
        axios.get(url)
          .then(response => (resolve(response.data)))
          .catch(error => (reject(error)))
      ))
      .then(
      (_data) => { return { ..._data, path, loggedUser, }; },
      (err) => { return { doc: [], error: err, path: path, }; }
      );
    } else if (path.indexOf('/documents') === 0) {
      // here
    } else {
      return { path, loggedUser, };
    }
  }

  constructor(props) {
    super(props);
    // this.state = {
    //   loggedUser: false,
    //   isAuthenticated: false,
    // };
  }

  render() {
    return (
      <div>
        <Head>
          <link rel="stylesheet" href="../static/skeleton.css" />
          <link rel="stylesheet" href="../static/datepicker.css" />
          <link rel="stylesheet" href="../static/reactwidgets.css" />
        </Head>
        <div className={styles.app}>
          <div className={styles.main}>
            <Header {...this.props} />
            {this.props.loggedUser ? 'logged in' : 'not logged in'}
            <Page {...this.props} />
          </div>
        </div>
      </div>
    );
  }
};


