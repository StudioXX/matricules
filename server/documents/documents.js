const express = require('express');
const fs = require('fs-extra'); //File System - for file manipulation
const fileType = require('file-type');
const Busboy = require('busboy'); //middleware for form/file upload
const db = require('../db');

const router = express.Router();
// get all documents
router.get('/', (req, res, next) => { // eslint-disable-line no-unused-vars
  const database = db.get();
  const year = req.param('year');
  const keyword = req.param('keyword');
  const query = {};
  if (year !== 'all') {
    const start = new Date(year, 1, 1);
    const end = new Date(year, 12, 31);
    query.date = { $gte: start, $lt: end, };
  }
  if (keyword !== 'all') {
    query.keywords = keyword;
  }
  database.collection('documents').find(query).toArray((err, result) => {
    if (err) return console.log(err);
    res.send(result);
  });
});

// post media to server and return URL
router.post('/media/:accession', (req, res, next) => {
  // second attempt
  // console.log(req.params.accession);
  // let fstream;
  // let files = [];
  // let numfiles = 0,
  // finished = false;
  // const busboy = new Busboy({ headers: req.headers });
  // // busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
  // //   console.log(val);
  // // });
  // const dir = __dirname + `/../media/${req.params.accession}`;
  // console.log(dir);
  // if (!fs.existsSync(dir)) {
  //   console.log('making dir');
  //   fs.mkdirSync(dir);
  // } else { console.log('dir exists'); }
  // busboy.on('file', function (fieldname, file, filename) {
  //   ++numfiles;
  //   fstream = fs.createWriteStream(__dirname + '/../media/' + filename);
  //   file.pipe(fstream);
  //   fstream.on('close', function(){
  //     // console.log('file ' + filename + ' uploaded');
  //     res.writeHead(200, { 'Connection': 'close', });
  //     res.end('we done');
  //     files.push(filename);
  //   });
  // });

  // busboy.on('end', function(){console.log('END')});

  // busboy.on('finish', function(){
  //     console.log('finish, files uploaded ', files);
  //     // res.redirect('back');
  // });
  // req.pipe(busboy);

  const busboy = new Busboy({ headers: req.headers });
  let numfiles = 0;
  let finished = false;
  const dir = __dirname + `/../media/${req.params.accession}`;
    console.log(dir);
    if (!fs.existsSync(dir)) {
      console.log('making dir');
      fs.mkdirSync(dir);
    } else { console.log('dir exists'); }
  busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
    console.log(encoding);
    console.log(mimetype);
    console.log('Uploading: ' + filename);
    ++numfiles;
    const fstream = fs.createWriteStream(dir + '/' + filename);
    console.log(fileType(fstream));
    fstream.on('finish', function() {
      if (--numfiles === 0 && finished) {
        res.writeHead(200, { 'Connection': 'close' });
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

// edit one document by its accession number
router.post('/:accession', (req, res, next) => { // eslint-disable-line no-unused-vars
  const database = db.get();
  console.log(req.body.accession_number);
  database.collection('documents').findOneAndUpdate({ accession_number: req.body.accession_number, }, {
    $set: {
      keywords: req.body.keywords,
      medium: req.body.medium,
      date: req.body.date,
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
    },
  }, {
    sort: { _id: -1 },
    upsert: true,
  }, (err, result) => {
    if (err) return res.send(err);
    res.send(result);
  });
});

// create one
router.post('/', (req, res, next) => { // eslint-disable-line no-unused-vars
});

module.exports = router;
