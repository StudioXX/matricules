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
      doclist: [],
    };
    this.handleYearChange = this.handleYearChange.bind(this);
    this.handleKeywordChange = this.handleKeywordChange.bind(this);
    this.updateFilter = this.updateFilter.bind(this);
  }

  componentDidMount() {
    // set mounted property so we only set state if component is mounted
    this.mounted = true;
    this.updateFilter();
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  updateFilter() {
    let queries = '';
    queries += `year=${this.state.year}`;
    queries += `&keyword=${this.state.keyword}`;
    fetch(`http://localhost:4000/api/documents?${queries}`, {
      headers: {
        'Content-type': 'application/json',
      },
    }).then((response) => {
      return response.json();
    }).then((json) => {
      // only set state if component is mounted
      if (this.mounted === true) {
        this.setState({ doclist: json, });
      }
    });
  }

// these two functions require callbacks since setState is  asynchronous
  handleYearChange(yr) {
    const year = yr.toString();
    this.setState({
      year,
    }, () => this.updateFilter());
  }

  handleKeywordChange(kw) {
    this.setState({
      keyword: kw,
    }, () => this.updateFilter());
  }

  render() {
    return (<div>
      <KeywordPicker handleKeywordChange={this.handleKeywordChange} />
      <YearPicker handleYearChange={this.handleYearChange} />
      <DocumentsList doclist={this.state.doclist} />
    </div>);
  }
}

export default Documents;
