import React from 'react';
import css from 'next/css';
import axios from 'axios';
import fetch from 'isomorphic-fetch';
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
    // check for language - if server rendered, use request headers
    // if client rendered, use navigator.language
    let language = 'fr';
    if (process.browser) {
      if (window.localStorage.language) {
        console.log('found language in local storage');
        language = window.localStorage.language;
      } else { language = navigator.language.includes('fr') ? 'fr' : 'eng';
      }
    } else {
      if (ctx.req.headers.cookie) {
        const lang = ctx.req.headers.cookie.split(';').find(c => c.trim().startsWith('language='));
        if (lang) {
          console.log('found language in cookies');
          language = lang.split('=')[1];
        }
      } else {
        language = ctx.req.headers['accept-language'].includes('fr') ? 'fr' : 'eng';
      }
    }
    const loggedUser = process.browser ? getUserFromLocalStorage() : getUserFromCookie(ctx.req);
    console.log(`loggedUser = ${loggedUser}`);
    // only make this call if we're on a documents page'
    if (path.indexOf('/document/') === 0 || path.indexOf('/edit/') === 0) {
      const url = `http://localhost:4000/api/document/${path.split('/')[2]}`;
      return new Promise((resolve, reject) => (
        axios.get(url)
          .then(response => (resolve(response.data)))
          .catch(error => (reject(error)))
      ))
      .then(
      (_data) => { return { ..._data, path, loggedUser, language, }; },
      (err) => { return { doc: [], error: err, path: path, }; }
      );}
      // else if (path.indexOf('/documents') === 0) {
    //   // here
    // }
    else {
      return { path, loggedUser, language, };
    }

    // if (path.indexOf('/document/') === 0 || path.indexOf('/edit/') === 0) {
    //   const url = `http://localhost:4000/api/documents/${path.split('/')[2]}`;
    //   console.log(url);
    //   fetch(url, {
    //     headers: {
    //       'Content-type': 'application/json',
    //     },
    //   }).then((response) => {
    //     return response.json();
    //     // return { ...response, path, loggedUser, language }
    //   }).then((_data) => {
    //     return { ..._data, path, loggedUser, language }
    // });
    // }
     // end getInitialProps
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
            <Page {...this.props} />
          </div>
        </div>
      </div>
    );
  }
};


