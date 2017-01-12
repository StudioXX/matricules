import React from 'react';
import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import Button from '../UI/Button';
import ImageGallery from './ImageGallery';
import AudioGallery from './AudioGallery';

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
      images: this.props.images || [],
      links: this.props.links || [],
      medium: this.props.medium || '',
      notes: this.props.notes || '',
      physical_description: this.props.physical_description || '',
      sujet: this.props.sujet || '',
      sujetFrench: this.props.sujet_fr || '',
      support: this.props.support || '',
      title: this.props.title || '',
      audio: this.props.audio || [],
      video: this.props.video || [],
    };
  }

  componentDidMount() {
    this.mounted = true;
    if (!this.props._data) {
      console.log('rednered by client');
      const url = `http://localhost:4000/api/document/${this.props.id}`;
      console.log(url);
      return new Promise((resolve, reject) => (
        axios.get(url)
          .then(response => (resolve(response.data)))
          .catch(error => (reject(error)))
      ))
      .then(
      (_data) => {
        console.log(_data);
        this.setState({ 
          accession_number: _data.accession_number,
          categorie: _data.categorie,
          date: _data.date,
          description: _data.description,
          descriptionFrench: _data.description_fr,
          keywords: _data.keywords,
          images: _data.images,
          links: _data.links,
          medium: _data.medium,
          notes: _data.notes,
          physical_description: _data.physical_description,
          sujet: _data.sujet,
          sujetFrench: _data.sujet_fr,
          support: _data.support,
          title: _data.title,
          videos: _data.videos,
          audio: _data.audio,
        }) },
      (err) => { console.log(err); }
      );
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    // only display edit button to logged in user
    const editlink = (this.props.loggedUser) ? <Link href={`/edit?id=${this.state.accession_number}`} as={`/edit/${this.state.accession_number}`}><a><button className={'button-primary'}>Edit</button></a></Link> : null;
    const language = this.props.language;
    const titlestring = (language === 'fr') ? 'Titre forgé' : 'Formed Title';
    const images = <div>images: <ImageGallery accession={this.state.accession_number} images={this.state.images} /></div>;
    const audios = <div>audio: <AudioGallery accession={this.state.accession_number} audio={this.state.audio} /></div>;

    return (<div>
      <Head>
        <title>ffff</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="title" content={`Studio XX | ${this.state.title}`} />
        <meta name="description" content={this.state.description} />
      </Head>
      <div>
        {(language === 'fr') ? 'Numéro d\'accession' : 'Accession Number' }: {this.state.accession_number}
      </div>
      <div>
        {(language === 'fr') ? 'Categorie' : 'Category' }: {this.state.categorie}
      </div>
      <div>
      Date: {this.state.date}
      </div>
      <div>
      Description: {(language === 'fr' && this.state.descriptionFrench !== '') ? this.state.descriptionFrench : this.state.description }
      </div>
      <div>
      Keywords: {this.state.keywords}
      </div>
      <div>
      Links:
      </div>
      <div>
        {(language === 'fr') ? 'Médium' : 'Medium' }: {this.state.medium}
      </div>
      <div>
      Notes: {this.state.notes}
      </div>
      <div>
        {(language === 'fr') ? 'Description physique' : 'Physical Description' }: {this.state.physical_description}
      </div>
      <div>
        {(language === 'fr') ? 'Sujet' : 'Subject' }: {(language === 'fr' && this.state.sujetFrench !== '') ? this.state.sujetFrench : this.state.sujet }
      </div>
      <div>
      Support: {this.state.support}
      </div>
      <div>
        {titlestring}: {this.state.title}
      </div>
      <div>
        {editlink}
      </div>
      {(this.state.audio.length > 0) ? audios : null}
      {(this.state.images.length > 0) ? images : null}
    </div>
    );
  }
}

export default Document;
