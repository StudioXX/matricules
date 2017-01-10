import React from 'react';

class AudioGallery extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
      <h2>Audio List:</h2>
        {this.props.audio.map((file, i) => {
          return (
            <div key={i}>
              <audio id="player" controls>
                <source
                  src={`http://localhost:4000/${this.props.accession}/${file}`}
                />
              </audio>
              <h3>{file}</h3>
              <button onClick={() => this.props.handleAudioDelete(i)}>Delete</button>
            </div>
          );
        })}
      </div>
    );
  }
}

export default AudioGallery;
