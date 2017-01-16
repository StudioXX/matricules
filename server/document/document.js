const express = require('express');
const fs = require('fs-extra'); // File System - for file manipulation
// const Busboy = require('busboy'); // middleware for form/file upload
const expressJwt = require('express-jwt');
const multer = require('multer');
const Document = require('../models/documents-model.js');
const tokenSecret = require('../../config/config').secret;

const upload = multer();
const imgProc = require('./imgProcessor');

const router = express.Router();

router.post('/photos/:accession', upload.array('datafile'), (req, res, next) => {
  // console.log(req.files);
  // let imgs = [];
  // let audio = [];
  // let other = [];
  // for (let i = 0; i < req.files.length; i += 1) {
  //   const type = req.files[i].mimetype;
  //   if (type.includes('image')) {
  //     imgs.push(req.files[i]);
  //   } else if (type.includes('audio')) {
  //     audio.push(req.files[i]);
  //   } else {
  //     other.push(req.files[i]);
  //   }
  // }
  const dir = __dirname + `/../media/${req.params.accession}`;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  } else { console.log('dir exists'); }
  // Call the convertImgs method and pass the image files as its argument
  imgProc.convertImgs(req.files, req.params.accession).then((imageStringArray) => {
    // After all image processing finished, send the base64 image string to client
    console.log(imageStringArray);
    res.json(imageStringArray);
  });
  // audioProc.saveAudio(audio, dir, req, res).then((audioArray) => {
  //   res.json(audioArray);
  // });
});

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, __dirname + `/../media/${req.params.accession}`);
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

const mediaupload = multer({ storage, }).array('datafile');
router.post('/media/:accession', mediaupload, (req, res, next) => {
  const filenames = req.files;
  const dir = __dirname + `/../media/${req.params.accession}`;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  } else { console.log('dir exists'); }
  // Call the convertImgs method and pass the image files as its argument
  // imgProc.convertImgs(req.files, req.params.accession).then((imageStringArray) => {
  //   // After all image processing finished, send the base64 image string to client
  //   res.json(imageStringArray);
  // });
  mediaupload(req, res, function(err) {
    if (err) {
        console.log("Error uploading file.");
    }
    console.log(filenames);
    res.json(filenames);
  });
  // audioProc.saveAudio(audio, dir, req, res).then((audioArray) => {
  //   res.json(audioArray);
  // });
});



// post media to server and return URL
// router.post('/media/:accession', (req, res, next) => {
//   console.log('receiving files');
//   const busboy = new Busboy({ headers: req.headers });
//   let numfiles = 0;
//   let finished = false;
//   const dir = __dirname + `/../media/${req.params.accession}`;
//   if (!fs.existsSync(dir)) {
//     fs.mkdirSync(dir);
//   } else { console.log('dir exists'); }
//   busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
//     imagesize(file, (err, result) => {
//       // only execute if no error
//       if (!err) {
//         // resize if file big
//         if (result.width > 1200 || result.height > 1200) {
//           console.log('this is a huge file');
//           toArray(file)
//           .then((parts) => {
//             const buffers = [];
//             for (let i = 0, l = parts.length; i < l; i++) {
//               const part = parts[i];
//               buffers.push((part instanceof Buffer) ? part : new Buffer(part));
//             }
//             const path = `server/media/${req.params.accession}/${filename}`;
//             Jimp.read(Buffer.concat(buffers), (err, image) => {
//               // if (err) console.log(err);
//               // console.log('big file in jimp');
//               // image.resize(256, 256)            // resize
//               //     .quality(80)                 // set JPEG quality
//               //     .write(path, () => {
//               //       console.log('completed resize and upload');
//               //       if (--numfiles === 0 && finished) {
//               //         console.log('completed all upload');
//               //         res.writeHead(200, { Connection: 'close', });
//               //         // use this to send response text
//               //         res.end('');
//               //       }
//               //     }); // save
//             });
//           });
//         } else {
//           // don't resize
//           const fstream = fs.createWriteStream(dir + '/' + filename);
//           fstream.on('finish', () => {
//             console.log('completed resize and upload');
//             if (--numfiles === 0 && finished) {
//               console.log('completed all upload');
//               res.writeHead(200, { Connection: 'close', });
//               // use this to send response text
//               res.end('');
//             }
//           });
//           file.pipe(fstream);
//         }
//       }
//     });

//     ++numfiles;
//   });
//   busboy.on('finish', () => {
//     finished = true;
//   });
//   return req.pipe(busboy);
// });

// get one document by its accession number
router.get('/:accession', (req, res, next) => { // eslint-disable-line no-unused-vars
  Document.readOne(req.params.accession)
  .then((doc) => {
    res.json(doc);
  })
  .catch((err) => {
    next(err);
  });
});

// edit one document by its id
router.put('/:id', expressJwt({
  secret: tokenSecret,
  getToken: req => req.body.token,
}), (req, res, next) => { // eslint-disable-line no-unused-vars
  Document.updateById(req.params.id, req.body)
  .then((doc) => {
    res.json(doc);
  })
  .catch((err) => {
    next(err);
  });
});

// delete one document by its id
router.delete('/:id', expressJwt({
  secret: tokenSecret,
  getToken: req => req.body.token,
}), (req, res, next) => { // eslint-disable-line no-unused-vars
  Document.deleteById(req.params.id)
  .then((doc) => {
    res.json(doc);
  })
  .catch((err) => {
    next(err);
  });
});

// create one
router.post('/', expressJwt({
  secret: tokenSecret,
  getToken: req => req.body.token,
}), (req, res, next) => { // eslint-disable-line no-unused-vars
  Document.createOne(req.body)
  .then((doc) => {
    res.json(doc);
  })
  .catch((err) => {
    console.log(err);
    next(err);
  });
});

module.exports = router;
