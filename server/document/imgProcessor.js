const Jimp = require('jimp');

module.exports = {
  convertImgs(files, accession) {
    let promises = [];
    files.forEach((file) => {
      console.log(file);
      // Create a new promise for each image processing
      let promise = new Promise((resolve, reject) => {
        // Create a jimp instance for this image
        new Jimp(file.buffer, (err, image) => {
          console.log('creating image');
          const path = `server/media/${accession}/${file.originalname}`;
          const w = image.bitmap.width; // the width of the image
          const h = image.bitmap.height; // the height of the image
          if (w > 1200 || h > 1200) {
            // Resize this image
            image.scaleToFit(1200, 1200);
          }
            // lower the quality by 10%
          image.quality(90);
          image.write(path, () => {
            resolve({ originalname: file.originalname, mimetype: file.mimetype, });
          }); // save
        });
      });
      promises.push(promise);
    });
    // Return promise array
    return Promise.all(promises);
  },
};
