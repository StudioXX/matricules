const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const config = require('../config/config');
const User = require('../server/models/users-model.js');

passport.use(new LocalStrategy((username, password, cb) => {
  console.log('authing');
  console.log(username);
  console.log(password);
  User.readOne(username)
  .then((doc) => {
      bcrypt.compare(password, doc.password, (err, res) => {
        if (err) return cb(err);
        if (res === false) {
          console.log('bad password');
          return cb(null, false);
        } else {
          console.log('good password');
          return cb(null, doc);
        }
      });
      console.log(doc);
  })
  .catch((err) => {
    next(err);
  });
}));


