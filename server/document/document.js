const express = require('express');
const fs = require('fs-extra'); // File System - for file manipulation
const Busboy = require('busboy'); // middleware for form/file upload
const Document = require('../models/documents-model.js');

const router = express.Router();

// post media to server and return URL
router.post('/media/:accession', (req, res, next) => {
  const busboy = new Busboy({ headers: req.headers });
  let numfiles = 0;
  let finished = false;
  const dir = __dirname + `/../media/${req.params.accession}`;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  } else { console.log('dir exists'); }
  busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
    ++numfiles;
    const fstream = fs.createWriteStream(dir + '/' + filename);
    fstream.on('finish', () => {
      if (--numfiles === 0 && finished) {
        res.writeHead(200, { Connection: 'close', });
        // use this to send response text
        res.end('');
      }
    });
    file.pipe(fstream);
  });
  busboy.on('finish', () => {
    finished = true;
  });
  return req.pipe(busboy);
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
router.put('/:id', (req, res, next) => { // eslint-disable-line no-unused-vars
  Document.updateById(req.params.id, req.body)
  .then((doc) => {
    res.json(doc);
  })
  .catch((err) => {
    next(err);
  });
});

// delete one document by its id
router.delete('/:id', (req, res, next) => { // eslint-disable-line no-unused-vars
  Document.deleteById(req.params.id)
  .then((doc) => {
    res.json(doc);
  })
  .catch((err) => {
    next(err);
  });
});

// create one
router.post('/', (req, res, next) => { // eslint-disable-line no-unused-vars
  Document.createOne(req.body)
  .then((doc) => {
    res.json(doc);
  })
  .catch((err) => {
    next(err);
  });
});

module.exports = router;
