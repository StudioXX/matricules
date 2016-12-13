import React from 'react';
import css from 'next/css';

const styles = {
  galleryimage: css({
    width: '50%',
    maxWidth: '300px',
    display: 'block',
  }),
};

class ImageList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.images.map((image, i) => {
          return (
            <div key={i}>
              <img className={styles.galleryimage} alt={image} src={`http://localhost:4000/${this.props.accession}/${image}`} />
              <button onClick={() => this.props.handleImgDelete(i)}>delete</button>
            </div>
          );
        })}
      </div>
    );
  }
}

export default ImageList;
