import React from 'react';

import DocumentsList from './DocumentsList';
import YearPicker from './YearPicker';
import KeywordPicker from './KeywordPicker';

class Documents extends React.Component {
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
    const year = yr.toString();
    this.setState({
      year,
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

export default Documents;
