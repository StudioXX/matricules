import React from 'react';

import DocumentsList from './DocumentsList';
import YearPicker from './YearPicker';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      year: 'all',
    };
    this.handleYearChange = this.handleYearChange.bind(this);
  }

  handleYearChange(yr) {
    this.setState({
      year: yr,
    });
  }

  render() {
    return (<div>
      <YearPicker handleYearChange={this.handleYearChange} />
      <DocumentsList year={this.state.year} />
    </div>);
  }
}

module.exports = App;
