const express = require('express');
const db = require('../../lib/db');

const router = express.Router();

// get all documents
router.get('/', (req, res, next) => { // eslint-disable-line no-unused-vars
  const database = db.get();
  database.collection('documents').find().toArray((err, result) => {
    if (err) return console.log(err);
    res.send(result);
  });
});

// get documents matching query
// app.post('/documents', (req, res) => {
//   let searchparams = {};
//   if (req.body.keyword !== 'all') {
//     searchparams.keywords = req.body.keyword;
//   }
//   if (req.body.year !== 'all') {
//     const year = req.body.year;
//     const start = new Date(year, 1, 1);
//     const end = new Date(year, 12, 31);
//     searchparams.date = { $gte: start, $lt: end, };
//   }
//   db.collection('documents').find(searchparams).sort({ date: -1, }).toArray((err, result) => {
//     if (err) return console.log(err);
//     res.send(result);
//   });
// });

// get one document by its accession number
router.get('/:accession', (req, res, next) => { // eslint-disable-line no-unused-vars
  const database = db.get();
  const query = { 'accession_number': req.params.accession };
  database.collection('documents').findOne(query, (err, result) => {
    if (err) { return console.log(err); }
    res.send(result);
  });
});

// create one
router.post('/', (req, res, next) => { // eslint-disable-line no-unused-vars
});

module.exports = router;
