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
    const start = new Date(Date.UTC(year, 0, 1, 0, 0, 0));
    const end = new Date(Date.UTC(year, 11, 31, 23, 59, 59));
    console.log(start);
    console.log(end);
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

module.exports = router;
