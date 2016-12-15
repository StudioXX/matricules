const express = require('express');
const fs = require('fs-extra'); // File System - for file manipulation
const Busboy = require('busboy'); // middleware for form/file upload
const ObjectId = require('mongodb').ObjectID;
const db = require('../db');

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
  const database = db.get();
  const query = { 'accession_number': req.params.accession, };
  database.collection('documents').findOne(query, (err, result) => {
    if (err) { return console.log(err); }
    res.send(result);
  });
});

// edit one document by its id
router.put('/:id', (req, res, next) => { // eslint-disable-line no-unused-vars
  const database = db.get();
  console.log(req.params.id);
  database.collection('documents').findOneAndUpdate({ "_id": ObjectId(req.params.id), }, {
    $set: {
      accession_number: req.body.accession_number,
      keywords: req.body.keywords,
      medium: req.body.medium,
      date: new Date(req.body.date),
      categorie: req.body.categorie,
      support: req.body.support,
      links: req.body.links,
      notes: req.body.notes,
      title: req.body.title,
      description: req.body.description,
      sujet: req.body.sujet,
      physical_description: req.body.physical_description,
      description_fr: req.body.description_fr,
      sujet_fr: req.body.sujet_fr,
      audio: req.body.audio,
      images: req.body.images,
    },
  }, {
    sort: { _id: -1 },
    upsert: true,
  }, (err, result) => {
    if (err) return res.send(err);
    res.send(result);
  });
});

// delete one document by its id
router.delete('/:id', (req, res, next) => { // eslint-disable-line no-unused-vars
  const database = db.get();
  console.log(req.params.id);
  database.collection('documents').remove({ _id: ObjectId(req.params.id), }, {
    sort: { _id: -1 },
    upsert: true,
  }, (err, result) => {
    if (err) return res.send(err);
    res.send(result);
  });
});

// create one
router.post('/', (req, res, next) => { // eslint-disable-line no-unused-vars
  const database = db.get();
  console.log(req.body);
  database.collection('documents').insert({
    accession_number: req.body.accession_number,
    keywords: req.body.keywords,
    medium: req.body.medium,
    date: new Date(req.body.date),
    categorie: req.body.categorie,
    support: req.body.support,
    links: req.body.links,
    notes: req.body.notes,
    title: req.body.title,
    description: req.body.description,
    sujet: req.body.sujet,
    physical_description: req.body.physical_description,
    description_fr: req.body.description_fr,
    sujet_fr: req.body.sujet_fr,
    audio: req.body.audio,
    images: req.body.images,
  }, {
    sort: { _id: -1 },
    upsert: true,
  }, (err, result) => {
    if (err) return res.send(err);
    res.send(result);
  });
});

module.exports = router;
