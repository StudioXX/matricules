import React from 'react';
import XHRUploader from './XHRUploader';

class MediaUpload extends React.Component {
  render() {
    return (
      <XHRUploader
        url="http://localhost:4000/api/documents/media"
        auto
        maxFiles={25}
      />
    );
  }
}

export default MediaUpload;
