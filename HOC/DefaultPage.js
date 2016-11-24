import React from 'react';
import css from 'next/css';
import Header from '../components/Header';

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
    return {
      currentUrl: ctx.pathname,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      loggedUser: false,
      isAuthenticated: false,
    };
  }

//   componentDidMount () {
//     const loggedUser = getCookie();
//     const isAuthenticated = !!loggedUser
//     this.setState({
//       loggedUser: loggedUser,
//       isAuthenticated: isAuthenticated
//     })
//   }

  render() {
    return (
      <div>
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

