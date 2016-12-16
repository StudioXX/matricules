const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');
const passport = require('passport');
const User = require('../models/users-model.js');

require('../../utils/passport.js');

// auth routes
const router = express.Router();
// register
router.post('/register', (req, res, next) => { // eslint-disable-line no-unused-vars
  // perform verifications and checks here
  const newUser = req.body;
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(req.body.password, salt, (err, hash) => {
      if (err) return next(err);
      newUser.password = hash; // Or however suits your setup
      // Store the user to the database, then send the response
      newUser.role = 'Member';
      User.createOne(newUser)
      .then((doc) => {
        res.json(doc);
      })
      .catch((err) => {
        next(err);
      });
    });
  });
});

const tokenSecret = 'hoohah';

router.post('/login', (req, res, next) => { // eslint-disable-line no-unused-vars
  passport.authenticate('local', { session: false, }, (err, user, info) => {
    if (err) { return next(err); }
    if (user === false) {
      res.status(401).send('bad login');
    }
    // user has authenticated correctly thus we create a JWT token
    const token = jwt.encode({ username: 'somedata', }, tokenSecret);
    res.json(200, { token, });
  })(req, res, next);
});

module.exports = router;
