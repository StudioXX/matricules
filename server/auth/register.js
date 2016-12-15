const express = require('express');
const db = require('../db');
const User = require('../models/users-model.js');

const router = express.Router();
// register
router.get('/', (req, res, next) => { // eslint-disable-line no-unused-vars
  console.log(req.body);
  res.send('success');
});

module.exports = router;
