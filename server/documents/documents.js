const express = require('express');
const db = require('../db');
const Document = require('../models/documents-model.js');

const router = express.Router();
// get all documents
router.get('/', (req, res, next) => { // eslint-disable-line no-unused-vars
  const year = req.param('year');
  const keyword = req.param('keyword');
  const searchterm = req.param('searchterm');
  const query = {};
  if (year !== 'all') {
    const start = new Date(Date.UTC(year, 0, 1, 0, 0, 0));
    const end = new Date(Date.UTC(year, 11, 31, 23, 59, 59));
    query.date = { $gte: start, $lt: end, };
  }
  if (keyword !== '') {
    query.keywords = keyword;
  }
  if (searchterm !== '') {
    query.$text = {
      $search: searchterm,
      $caseSensitive: false,
    };
  }
  Document.readSelect(query)
  .then((doc) => {
    res.json(doc);
  })
  .catch((err) => {
    next(err);
  });
});

module.exports = router;
