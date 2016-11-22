const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const logger = require('morgan');
const config = require('../config/config');
const db = require('../lib/db');

const app = express();
const server = require('http').Server(app);

app.use(bodyParser.urlencoded({ extended: true, }));
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, 'public')));

// our logger settings
if (config.env === 'development') {
  app.use(logger('dev'));
} else {
  app.use(logger(config.morgan_log_level));
}

// connect to db
db.connect((err) => {
  if (err) {
    console.log('Unable to connect to db');
  } else {
    console.log(`Connected to db`);
  }
});

// handle API Router
const apiRouter = express.Router();

apiRouter.use('/documents', require('./documents/documents'));

apiRouter.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
});

// connect our api router to our main app
app.use('/api', apiRouter);

// handle serving client app
app.use(express.static(path.resolve(__dirname, '../public')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../public', 'index.html'));
});

module.exports = { app, server, };
