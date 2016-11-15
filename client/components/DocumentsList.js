import React from 'react';

class DocumentsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      doclist: [],
    };
    this.updateFilter = this.updateFilter.bind(this);
  }

  componentDidMount() {
    this.updateFilter();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.year !== this.props.year || prevProps.keyword !== this.props.keyword) {
      this.updateFilter();
    }
  }

  updateFilter() {
    fetch('/documents', {
      method: 'post',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      keyword: this.props.keyword,
      year: this.props.year,
    }),
    }).then((response) => {
      return response.json();
    }).then((json) => {
      this.setState({ doclist: json, });
    });
  }

  render() {
    const docs = this.state.doclist;
    return (
      <ul>
        {docs.map((doc, i) => {
          return <li key={i}>{doc.name} {doc.title}</li>;
        })}
      </ul>
    );
  }
}

DocumentsList.propTypes = {
  keyword: React.PropTypes.string,
  year: React.PropTypes.string,
};

module.exports = DocumentsList;


