import DatePicker from 'react-datepicker';
import React from 'react';

class DatePick extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div>
    <DatePicker
      selected={this.props.date}
      onChange={this.props.handler} />
      </div>
  }
}

export default DatePick;

