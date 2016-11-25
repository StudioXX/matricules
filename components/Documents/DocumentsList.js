import Link from 'next/link';
import React from 'react';

class DocumentsList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const docs = this.props.doclist;
    return (
      <ul>
        {docs.map((doc, i) => {
          return <li key={i}><Link href={`/documents/${doc.accession_number}`}>{doc.accession_number}</Link>{doc.title}</li>;
        })}
      </ul>
    );
  }
}

DocumentsList.propTypes = {
  doclist: React.PropTypes.array,
};

export default DocumentsList;


