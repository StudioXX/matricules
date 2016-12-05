import React from 'react';
import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import Button from '../UI/Button';

class Document extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accession_number: this.props.accession_number || '',
      categorie: this.props.categorie || '',
      date: this.props.date || '',
      description: this.props.description || '',
      descriptionFrench: this.props.description_fr || '',
      keywords: this.props.keywords || [],
      links: this.props.links || [],
      medium: this.props.medium || '',
      notes: this.props.notes || '',
      physical_description: this.props.physical_description || '',
      sujet: this.props.sujet || '',
      sujetFrench: this.props.sujet_fr || '',
      support: this.props.support || '',
      title: this.props.title || '',
    };
  }

  componentDidMount() {
    this.mounted = true;
    if (!this.props._data) {
      console.log('rednered by client');
      const url = `http://localhost:4000/api/documents/${this.props.path.split('/')[2]}`;
      return new Promise((resolve, reject) => (
        axios.get(url)
          .then(response => (resolve(response.data)))
          .catch(error => (reject(error)))
      ))
      .then(
      (_data) => { this.setState({ 
        accession_number: _data.accession_number,
        categorie: _data.categorie,
        date: _data.date,
        description: _data.description,
        descriptionFrench: _data.description_fr,
        keywords: _data.keywords,
        links: _data.links,
        medium: _data.medium,
        notes: _data.notes,
        physical_description: _data.physical_description,
        sujet: _data.sujet,
        sujetFrench: _data.sujet_fr,
        support: _data.support,
        title: _data.title,
       }) },
      (err) => { console.log(err); }
      );
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    const editlink = `../edit/${this.state.accession_number}`;
    return (<div>
      <Head>
        <title>ffff</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="title" content={`Studio XX | ${this.state.title}`} />
        <meta name="description" content={this.state.description} />
      </Head>
      <div>
      accession number: {this.state.accession_number}
      </div>
      <div>
      categorie: {this.state.categorie}
      </div>
      <div>
      date: {this.state.date}
      </div>
      <div>
      description: {this.state.description}
      </div>
      <div>
      keywords: {this.state.keywords}
      </div>
      <div>
      links:
      </div>
      <div>
      medium: {this.state.medium}
      </div>
      <div>
      notes: {this.state.notes}
      </div>
      <div>
      physical description: {this.state.physical_description}
      </div>
      <div>
      sujet: {this.state.sujet}
      </div>
      <div>
      support: {this.state.support}
      </div>
      <div>
      title: {this.state.title}
      </div>
      <Button text="edit" link={editlink} />
    </div>
    );
  }
}

export default Document;
