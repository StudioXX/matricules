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
    // set mounted property so we only set state if component is mounted
    this.mounted = true;
    this.updateFilter();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.year !== this.props.year || prevProps.keyword !== this.props.keyword) {
      this.updateFilter();
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  updateFilter() {
    let queries = '';
    queries += `year=${this.props.year}`;
    queries += `&keyword=${this.props.keyword}`;
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

  render() {
    const docs = this.state.doclist;
    return (
      <ul>
        {docs.map((doc, i) => {
          return <li key={i}>{doc.accession_number} {doc.title}</li>;
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


