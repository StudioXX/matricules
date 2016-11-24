// Database config

const MongoClient = require('mongodb').MongoClient;
const mongourl = require('../config/secret').mongo;

// We store our full database object in here
let dbstate;

const connect = (callback) => {
  MongoClient.connect(mongourl, (err, db) => {
    dbstate = db;
    return callback(err);
  });
};

// this method returns reference the the db
const get = () => {
  return dbstate;
};

module.exports = { connect, get, };
