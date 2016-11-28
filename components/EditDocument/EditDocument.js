import React from 'react';
import TextInput from '../UI/TextInput';
import CategoriePicker from '../UI/CategoriePicker';
import DatePick from '../UI/DatePicker';

class EditDocument extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accession_number: this.props._data.accession_number,
      categorie: this.props._data.categorie,
      date: this.props._data.date,
      description: this.props._data.description,
      keywords: this.props._data.keywords,
      link: this.props._data.links,
      medium: this.props._data.medium,
      notes: this.props._data.notes,
      physical_description: this.props._data.physical_description,
      sujet: this.props._data.sujet,
      support: this.props._data.support,
      title: this.props._data.title,
    };
    this.handleAccession = this.handleAccession.bind(this);
    this.handleCategorie = this.handleCategorie.bind(this);
  }

  handleAccession(event) {
    this.setState({ accession_number: event.target.value });
  }

  handleCategorie(event) {
    this.setState({ categorie: event.target.value });
  }

  render() {
    return (<div>
      <div>
      Accession Number:
      <TextInput handler={this.handleAccession} text={this.state.accession_number} />
      </div>
      <div>
      categorie: <CategoriePicker handler={this.handleCategorie} value={this.state.categorie} />
      </div>
      <div>
      date: {this.props._data.date}
      <DatePick />
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
    </div>
    );
  }
}

export default EditDocument;
