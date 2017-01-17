import React from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import KeywordOne from './KeywordOne';
import KeywordEdit from './KeywordEdit';

class Keywords extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keywords: [],
      modalIsOpen: false,
      selectedKeyword: {},
    };
    this.fetchData = this.fetchData.bind(this);
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.selectKeyword = this.selectKeyword.bind(this);
    this.createNew = this.createNew.bind(this);
  }

  componentDidMount() {
    this.mounted = true;
    this.fetchData();
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  fetchData() {
    const url = `http://localhost:4000/api/keywords`;
    return new Promise((resolve, reject) => (
      axios.get(url)
        .then(response => (resolve(response.data)))
        .catch(error => (reject(error)))
    ))
    .then(
    (_data) => {
      console.log(_data);
      this.setState({
        keywords: _data,
      }); },
    (err) => { console.log(err); }
    );
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.refs.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
    this.fetchData();
  }

  selectKeyword(obj) {
    this.setState({
      selectedKeyword: obj,
      modalIsOpen: true,
    });
  }

  createNew() {
    this.setState({
      selectedKeyword: {
        english: '',
        french: '',
        key: 0,
      },
      modalIsOpen: true,
    });
  }

  render() {
    const customStyles = {
      content: {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
      }
    };
    return (<div>
      <Modal
        isOpen={this.state.modalIsOpen}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <KeywordEdit closeModal={this.closeModal} selectedKeyword={this.state.selectedKeyword} />
      </Modal>
      <button onClick={this.createNew}>Add New Keyword</button>
      {this.state.keywords.map((keyword, i) => {
        return (
          <KeywordOne key={i} selectKeyword={this.selectKeyword} english={keyword.english} french={keyword.french} obj={keyword} />
        )
      })}

    </div>
    );
  }
}

export default Keywords;
