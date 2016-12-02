import React from 'react';
import defaultPage from '../HOC/DefaultPage';
import Button from '../components/UI/Button';

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
        <Button text="Add Document" link="/add" />
      </div>
    );
  }
}

export default defaultPage(Index);
