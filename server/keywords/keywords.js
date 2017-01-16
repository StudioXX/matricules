const express = require('express');
const expressJwt = require('express-jwt');
const Keyword = require('../models/keywords-model.js');
const tokenSecret = require('../../config/config').secret;

const router = express.Router();

// get all keywords
router.get('/', (req, res, next) => { // eslint-disable-line no-unused-vars
  Keyword.readAll()
  .then((doc) => {
    res.json(doc);
  })
  .catch((err) => {
    next(err);
  });
});

// get one keyword by its key
router.get('/:key', (req, res, next) => { // eslint-disable-line no-unused-vars
  Keyword.readOne(req.params.key)
  .then((doc) => {
    res.json(doc);
  })
  .catch((err) => {
    next(err);
  });
});

// edit one keyword by its id
router.put('/:key', expressJwt({
  secret: tokenSecret,
  getToken: req => req.body.token,
}), (req, res, next) => { // eslint-disable-line no-unused-vars
  Keyword.updateOne(req.params.key, req.body)
  .then((doc) => {
    res.json(doc);
  })
  .catch((err) => {
    next(err);
  });
});

// delete one keyword by its key
router.delete('/:key', expressJwt({
  secret: tokenSecret,
  getToken: req => req.body.token,
}), (req, res, next) => { // eslint-disable-line no-unused-vars
  Keyword.deleteOne(req.params.key)
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
  Keyword.createOne(req.body)
  .then((doc) => {
    res.json(doc);
  })
  .catch((err) => {
    next(err);
  });
});

module.exports = router;
