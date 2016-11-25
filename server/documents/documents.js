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

// create one
router.post('/', (req, res, next) => { // eslint-disable-line no-unused-vars
});

module.exports = router;
