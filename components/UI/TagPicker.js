import React from 'react';
import { WithContext as ReactTags } from 'react-tag-input';
import { Multiselect } from 'react-widgets';

class TagPicker extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let tags = [];
    for (let i=0;i<this.props.keywords.length;i++) {
      tags.push({
        id: i,
        text: this.props.keywords[i],
      });
    }
    let suggestions = ['art', 'radio', 'feminist', 'HTMLles'];
    return (
      <div>
          <ReactTags tags={tags}
          handleAddition={this.props.handleAdd}
              suggestions={suggestions}
          />
      </div>
    );
  }
}

export default TagPicker;
