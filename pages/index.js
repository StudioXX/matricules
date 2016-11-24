import React from 'react';
import defaultPage from '../HOC/DefaultPage';

const Index = () => (
  <div>
    Hello world!
    <a href="/about">about</a>
  </div>
);

export default defaultPage(Index);
