import React from 'react';
import css from 'next/css';
import axios from 'axios';
import Head from 'next/head';
import Header from '../components/Header/Header';


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
    // only make this call if we're on a documents page'
    if (path.indexOf('/documents/') === 0 || path.indexOf('/edit/') === 0) {
      const url = `http://localhost:4000/api/documents/${path.split('/')[2]}`;
      return new Promise((resolve, reject) => (
        axios.get(url)
          .then(response => (resolve(response.data)))
          .catch(error => (reject(error)))
      ))
      .then(
      (_data) => { return { _data, }; },
      (err) => { return { doc: [], error: err, path: path, }; }
      );
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      loggedUser: false,
      isAuthenticated: false,
    };
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
            <Page {...this.props} isAuthenticated={this.state.isAuthenticated} loggedUser={this.state.loggedUser} />
          </div>
        </div>
      </div>
    );
  }
};


