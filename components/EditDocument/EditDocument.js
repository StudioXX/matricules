import React from 'react';
import moment from 'moment';
import axios from 'axios';
import TextInput from '../UI/TextInput';
import CategoriePicker from '../UI/CategoriePicker';
import TagPicker from '../UI/TagPicker';
import DatePick from '../UI/DatePicker';
import TextArea from '../UI/TextArea';
import LinkListEdit from '../UI/LinkListEdit';
import MediumPicker from '../UI/MediumPicker';
import SupportPicker from '../UI/SupportPicker';
import Button from '../UI/Button';
import XHRUploader from '../UI/XHRUploader';

class EditDocument extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accession_number: '',
      categorie: '',
      date: moment(),
      description: '',
      descriptionFrench: '',
      keywords: [],
      links: [],
      medium: '',
      notes: '',
      physical_description: '',
      sujet: '',
      sujetFrench: '',
      support: '',
      title: '',
    };
    this.handleAccession = this.handleAccession.bind(this);
    this.handleCategorie = this.handleCategorie.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.handleDescription = this.handleDescription.bind(this);
    this.handleDescriptionFrench = this.handleDescriptionFrench.bind(this);
    this.handleTagAdd = this.handleTagAdd.bind(this);
    this.handleTagDelete = this.handleTagDelete.bind(this);
    this.handleLinksURL = this.handleLinksURL.bind(this);
    this.handleLinksDesc = this.handleLinksDesc.bind(this);
    this.handleAddLink = this.handleAddLink.bind(this);
    this.handleNotes = this.handleNotes.bind(this);
    this.handleSupport = this.handleSupport.bind(this);
    this.handleSujet = this.handleSujet.bind(this);
    this.handleSujetFrench = this.handleSujetFrench.bind(this);
    this.handleTitle = this.handleTitle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleMediaUpload = this.handleMediaUpload.bind(this);
  }

  componentDidMount() {
    this.mounted = true;
    if (this.props._data) {
      console.log('rednered by server');
      if (this.mounted === true) {
        this.setState({
          accession_number: this.props.accession_number || '',
          categorie: this.props.categorie || '',
          date: moment(this.props.date),
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
        });
      }
    } else {
      console.log('rednered by client');
      const url = `http://localhost:4000/api/documents/${this.props.path.split('/')[2]}`;
      console.log(url);
      return new Promise((resolve, reject) => (
        axios.get(url)
          .then(response => (resolve(response.data)))
          .catch(error => (reject(error)))
      ))
      .then(
      (_data) => { this.setState({
        accession_number: _data.accession_number || '',
        categorie: _data.categorie || '',
        date: moment(_data.date),
        description: _data.description || '',
        descriptionFrench: _data.description_fr || '',
        keywords: _data.keywords || [],
        links: _data.links || [],
        medium: _data.medium || '',
        notes: _data.notes || '',
        physical_description: _data.physical_description || '',
        sujet: _data.sujet || '',
        sujetFrench: _data.sujet_fr || '',
        support: _data.support || '',
        title: _data.title || '',
      }); },
      (err) => { return { doc: [], error: err, }; }
      );
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  handleAccession(event) {
    this.setState({ accession_number: event.target.value });
  }

  handleCategorie(event) {
    this.setState({ categorie: event.target.value });
  }

  handleDate(date) {
    this.setState({ date: date });
  }

  handleDescription(event) {
    this.setState({ description: event.target.value });
  }

  handleDescriptionFrench(event) {
    this.setState({ descriptionFrench: event.target.value });
  }

  handleTagAdd(value) {
    const tags = this.state.keywords;
    tags.push(value);
    this.setState({ keywords: tags });
  }

  handleTagDelete(i) {
    let tags = this.state.keywords;
    tags.splice(i, 1);
    this.setState({keywords: tags});
  }

  handleLinksURL(i, event) {
    const state = this.state.links;
    state[i].url = event.target.value;
    this.setState({links: state});
  }

  handleLinksDesc(i, event) {
    const state = this.state.links;
    state[i].title = event.target.value;
    this.setState({links: state});
  }

  handleAddLink() {
    const state = this.state.links;
    state.push({ url: '', title: '', });
    this.setState({ links: state });
  }

  handleMedium(event) {
    this.setState({ medium: event.target.value });
  }

  handleNotes(event) {
    this.setState({ notes: event.target.value });
  }

  handlePhysDesc(event) {
    this.setState({ physical_description: event.target.value });
  }

  handleSujet(event) {
    this.setState({ sujet: event.target.value });
  }

  handleSujetFrench(event) {
    this.setState({ sujetFrench: event.target.value });
  }

  handleSupport(event) {
    this.setState({ support: event.target.value });
  }

  handleTitle(event) {
    this.setState({ title: event.target.value });
  }

  handleSubmit() {
    const url = `http://localhost:4000/api/documents/${this.state.accession_number}`;
    axios.post(url, {
      accession_number: this.state.accession_number,
      categorie: this.state.categorie,
      date: this.state.date.toDate(),
      description: this.state.description,
      description_fr: this.state.descriptionFrench,
      keywords: this.state.keywords,
      links: this.state.links,
      medium: this.state.medium,
      notes: this.state.notes,
      physical_description: this.state.physical_description,
      sujet: this.state.sujet,
      sujet_fr: this.state.sujetFrench,
      support: this.state.support,
      title: this.state.title,
    })
    .then((response) => {
      const viewurl = `../documents/${this.state.accession_number}`;
      this.props.url.pushTo(viewurl);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  handleMediaUpload(file) {
    return new Promise((resolve, reject) => {
      let formData = new FormData();
      formData.append('file', file); 
      const xhr = new XMLHttpRequest();
      xhr.open('post', 'http://localhost:4000/api/documents/media', true);
      xhr.onload = function () {
        if (this.status === 200) {
          resolve(this.response);
        } else {
          reject(this.statusText);
        }
      };
      xhr.send(formData);
    });
  }

  render() {
    const readlink = `../documents/${this.state.accession_number}`;
    const mediauploadlink = `http://localhost:4000/api/documents/media/${this.state.accession_number}`;
    // TODO : create keywords db collection and pull from it
    return (<div>
      <Button text="Back" link={readlink} />
      <div>
      Accession Number:
      <TextInput handler={this.handleAccession} text={this.state.accession_number} />
      </div>
      <div>
      categorie: <CategoriePicker handler={this.handleCategorie} value={this.state.categorie} />
      </div>
      <div>
      date:
        <DatePick date={this.state.date} handler={this.handleDate} />
      </div>
      <div className="row">
        <div className="six columns">
          description (english):
          <TextArea handler={this.handleDescription} value={this.state.description || ''} />
        </div>
        <div className="six columns">
          description (français):
          <TextArea handler={this.handleDescriptionFrench} value={this.state.descriptionFrench || ''} />
        </div>
      </div>
      <div>
      keywords:
      <TagPicker keywords={this.state.keywords} handleAdd={this.handleTagAdd} handleDelete={this.handleTagDelete} />
      </div>
      <div>
      links:
      <LinkListEdit addhandler={this.handleAddLink} urlhandler={this.handleLinksURL} deschandler={this.handleLinksDesc} links={this.state.links} />
      </div>
      <div>
      medium: <MediumPicker handler={this.handleMedium} value={this.state.medium} />
      </div>
      <div>
      notes: <TextArea handler={this.handleNotes} value={this.state.notes || ''} />
      </div>
      <div>
      physical description: <TextInput handler={this.handlePhysDesc} text={this.state.physical_description} />
      </div>
      <div className="row">
        <div className="six columns">
          sujet (english):
          <TextArea handler={this.handleSujet} value={this.state.sujet || ''} />
        </div>
        <div className="six columns">
          sujet (français):
          <TextArea handler={this.handleSujetFrench} value={this.state.sujetFrench || ''} />
        </div>
      </div>
      <div>
      support: <SupportPicker handler={this.handleSupport} value={this.state.support} />
      </div>
      <div>
      title: <TextInput handler={this.handleTitle} text={this.state.title} />
      </div>
      <div>
        <XHRUploader
        url={mediauploadlink}
        auto
        maxFiles={25}
        accession_number={this.state.accession_number}
      />
      </div>
      <div>
        <button onClick={this.handleSubmit} className={'button-primary'}>Save</button>
      </div>
    </div>
    );
  }
}

export default EditDocument;
