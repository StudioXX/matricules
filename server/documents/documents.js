const express = require('express');
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
