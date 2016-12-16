const express = require('express');
const bcrypt = require('bcrypt');
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

router.post('/login', (req, res, next) => { // eslint-disable-line no-unused-vars
  passport.authenticate('local', (err, user, info) => {
    if (err) { return next(err); }
    if (!user) {
      return res.json(401, { error: 'message', });
    }
    // user has authenticated correctly thus we create a JWT token 
    // const token = jwt.encode({ username: 'somedata'}, tokenSecret);
    // res.json({ token : token });
    console.log('login success');
    res.send(200);
    res.end('hua')
  })(req, res, next);
});

module.exports = router;
