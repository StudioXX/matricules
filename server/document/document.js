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
  const dir = __dirname + `/../media/${req.params.accession}`;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  } else { console.log('dir exists'); }
  // Call the convertImgs method and pass the image files as its argument
  imgProc.convertImgs(req.files, req.params.accession).then((imageStringArray) => {
    // After all image processing finished, send the base64 image string to client
    res.json(imageStringArray);
  });
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
  mediaupload(req, res, function(err) {
    if (err) {
        console.log("Error uploading file.");
    }
    res.json(filenames);
  });
});

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
