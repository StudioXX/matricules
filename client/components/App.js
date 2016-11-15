import React from 'react';

import DocumentsList from './DocumentsList';
import YearPicker from './YearPicker';
import KeywordPicker from './KeywordPicker';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      year: 'all',
      keyword: 'all',
    };
    this.handleYearChange = this.handleYearChange.bind(this);
    this.handleKeywordChange = this.handleKeywordChange.bind(this);
  }

  handleYearChange(yr) {
    this.setState({
      year: yr,
    });
  }

  handleKeywordChange(kw) {
    this.setState({
      keyword: kw,
    });
  }

  render() {
    return (<div>
      <KeywordPicker handleKeywordChange={this.handleKeywordChange} />
      <YearPicker handleYearChange={this.handleYearChange} />
      <DocumentsList year={this.state.year} keyword={this.state.keyword} />
    </div>);
  }
}

module.exports = App;
