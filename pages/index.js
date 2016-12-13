import React from 'react';
import defaultPage from '../HOC/DefaultPage';

const SuperSecretDiv = () => (
  <div>
    This is a super secret div.
  </div>
);

class Index extends React.Component {
  render() {
    return (
      <div>
        Hello world!
        <br />
        {this.props.loggedUser && <SuperSecretDiv />}
        <br />
      </div>
    );
  }
}

export default defaultPage(Index);
