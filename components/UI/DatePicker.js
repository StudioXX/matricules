import DatePicker from 'react-datepicker';
import moment from 'moment';
import Head from 'next/head';
import React from 'react';

class DatePick extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment(),
    };
    this.handlechange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date,
    });
  }

  render() {
    return <div>
    <Head>
      <link rel="stylesheet" href="../static/datepicker.css" />
    </Head>
    <DatePicker
      selected={this.state.startDate}
      onChange={this.handleChange} />
      </div>
  }
}

export default DatePick;

