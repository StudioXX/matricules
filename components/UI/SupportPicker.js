import React from 'react';

class SupportPicker extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <select value={this.props.value} onChange={this.props.handler}>
          <option value="Audio Cassette">Audio Cassette</option>
          <option value="Binder">Binder</option>
          <option value="Book">Book</option>
          <option value="Brochure">Brochure</option>
          <option value="Catalogue">Catalogue</option>
          <option value="CD">CD</option>
          <option value="DAT">DAT</option>
          <option value="Digital Multimedia">Digital Multimedia</option>
          <option value="Digital Photograph">Digital Photograph</option>
          <option value="DVD">DVD</option>
          <option value="Floppy Disk">Floppy Disk</option>
          <option value="Hi8">Hi8</option>
          <option value="Invitation">Invitation</option>
          <option value="Journal">Journal</option>
          <option value="Mini disc">Mini disc</option>
          <option value="Mini DV">Mini DV</option>
          <option value="PDF">PDF</option>
          <option value="Photograph">Photograph</option>
          <option value="Poster">Poster</option>
          <option value="Program">Program</option>
          <option value="Report">Report</option>
          <option value="Slide">Slide</option>
          <option value="Travan drive">Travan drive</option>
          <option value="VHS">VHS</option>
          <option value="Zip disc">Zip disc</option>
          <option value="Other">Other</option>
        </select>
      </div>
    );
  }
}

SupportPicker.propTypes = {
  value: React.PropTypes.string,
};

export default SupportPicker;
