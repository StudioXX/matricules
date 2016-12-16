const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const config = require('../config/config');
const User = require('../server/models/users-model.js');

passport.use(new LocalStrategy((username, password, cb) => {
  User.readOne(username)
  .then((doc) => {
    if (doc === null) { return cb(null, false); }
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
  })
  .catch((err) => {
    console.log(err);
    console.log('error in User.readOne');
  });
}));


