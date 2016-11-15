import React from 'react';

class DocumentsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      doclist: [],
    };
    this.updateYearFilter = this.updateYearFilter.bind(this);
  }

  componentDidMount() {
    this.updateYearFilter();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.year !== this.props.year) {
      this.updateYearFilter();
    }
  }

  updateYearFilter() {
    let path = '/documents';
    if (this.props.year !== 'all') {
      path += `/${this.props.year}`;
    }
    fetch(path).then((response) => {
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
          return <li key={i}>{doc.name} {doc.date}</li>;
        })}
      </ul>
    );
  }

}

module.exports = DocumentsList;


