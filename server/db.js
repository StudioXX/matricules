// Database config
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

// We store our full database object in here
let dbstate;

const connect = (uri) => {
  dbstate = dbstate
    ? dbstate
    : mongoose.createConnection(uri);
  return dbstate;
};

// this method returns reference the the db
const get = () => {
  return dbstate;
};

module.exports = { connect, get, };
