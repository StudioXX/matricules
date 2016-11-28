import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Button from '../UI/Button';

class Document extends React.Component {
  render() {
    const editlink = `../edit/${this.props._data.accession_number}`;
    return (<div>
      <Head>
        <title>ffff</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="title" content={`Studio XX | ${this.props._data.title}`} />
        <meta name="description" content={this.props._data.description} />
      </Head>
      <div>
      accession number: {this.props._data.accession_number}
      </div>
      <div>
      categorie: {this.props._data.categorie}
      </div>
      <div>
      date: {this.props._data.date}
      </div>
      <div>
      description: {this.props._data.description}
      </div>
      <div>
      keywords: {this.props._data.keywords}
      </div>
      <div>
      links: {this.props._data.links}
      </div>
      <div>
      medium: {this.props._data.medium}
      </div>
      <div>
      notes: {this.props._data.notes}
      </div>
      <div>
      physical description: {this.props._data.physical_description}
      </div>
      <div>
      sujet: {this.props._data.sujet}
      </div>
      <div>
      support: {this.props._data.support}
      </div>
      <div>
      title: {this.props._data.title}
      </div>
      <Button text="edit" link={editlink} />
    </div>
    );
  }
}

export default Document;
