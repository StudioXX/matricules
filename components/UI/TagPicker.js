import React from 'react';
import { Multiselect } from 'react-widgets';

class TagPicker extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps() {
    console.log('new props');
    this.forceUpdate();
  }

  render() {
    const allkeywords = ['art', 'radio', 'feminist', 'HTMLles'];
    return (
      <Multiselect onChange={this.props.handler} defaultValue={this.props.keywords} data={allkeywords} />
    );
  }
}

export default TagPicker;
