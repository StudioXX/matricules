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
    let queries = '';
    if (this.props.year !== 'all') {
      queries += `?year=${this.props.year}`;
    }
    fetch(`http://localhost:4000/api/documents${queries}`, {
      headers: {
        'Content-type': 'application/json',
      },
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

export default DocumentsList;


