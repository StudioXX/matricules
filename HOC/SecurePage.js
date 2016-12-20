import React from 'react';

import DefaultPage from './DefaultPage';

const securePageHoc = Page => class SecurePage extends React.Component {
  static getInitialProps (ctx) {
    return Page.getInitialProps && Page.getInitialProps(ctx);
  }
  render() {
    if (!this.props.loggedUser) {
      return <span>not authorized</span>;
    }
    return <Page {...this.props} />;
  }
};

export default Page => DefaultPage(securePageHoc(Page));
