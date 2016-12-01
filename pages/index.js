import React from 'react';
import defaultPage from '../HOC/DefaultPage';
import Button from '../components/UI/Button';

const Index = () => (
  <div>
    Hello world!
    <br />
    <Button text="Add Document" link="/add" />
  </div>
);

export default defaultPage(Index);
