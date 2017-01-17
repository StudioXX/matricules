import React from 'react';
import Select from 'react-select';

class TagPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: []
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(vals) {
    this.setState({
        value: vals
      });
  }

  render() {
    var options = [
    { value: 'one', label: 'Art' },
    { value: 'two', label: 'Radio' }
    ];

    return (
      <div>
      <Select
        name="form-field-name"
        value={this.state.value}
        options={options}
        onChange={this.handleChange}
        multi
        searchable
      />
      </div>
      )
    
  }
  // render() {
  //   const suggestions = ['art', 'radio', 'feminist', 'HTMLles'];
  //   return (
  //     <div>
  //       {this.props.keywords.map((keyword) => {
  //         return (
  //           <div>{keyword}</div>
  //         );
  //       })}
  //     </div>
  //   );
  // }
}

export default TagPicker;
