import React from 'react';
import css from 'next/css';

const style = css({
  height: '38px',
  padding: '6px 10px',
  backgroundColor: '#fff',
  border: '1px solid #D1D1D1',
  borderRadius: '4px',
  boxShadow: 'none',
  boxSizing: 'border-box',
});

class CategoriePicker extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <select value={this.props.value} onChange={this.props.handler}>
          <option value="ADM">ADM</option>
          <option value="COP">COP</option>
          <option value="EVS">EVS</option>
          <option value="FBR">FBR</option>
          <option value="FES">FES</option>
          <option value="FOR">FOR</option>
          <option value="PRM">PRM</option>
          <option value="PRS">PRS</option>
          <option value="PUB">PUB</option>
          <option value="RES">RES</option>
        </select>
      </div>
    );
  }
}

CategoriePicker.propTypes = {
  value: React.PropTypes.string,
};

export default CategoriePicker;
