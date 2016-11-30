import React from 'react';

class MediumPicker extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <select value={this.props.value} onChange={this.props.handler}>
          <option value="Audio/visual">Audio/visual</option>
          <option value="Audio">Audio</option>
          <option value="Electronic File">Electronic File</option>
          <option value="Electronic Print">Electronic Print</option>
          <option value="Paper Print">Paper Print</option>
          <option value="Other">Other</option>
        </select>
      </div>
    );
  }
}

MediumPicker.propTypes = {
  value: React.PropTypes.string,
};

export default MediumPicker;
