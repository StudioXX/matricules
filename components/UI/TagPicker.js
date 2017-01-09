import React from 'react';

class TagPicker extends React.Component {

  render() {
    const suggestions = ['art', 'radio', 'feminist', 'HTMLles'];
    return (
      <div>
        {this.props.keywords.map((keyword) => {
          return (
            <div>{keyword}</div>
          );
        })}
      </div>
    );
  }
}

export default TagPicker;
